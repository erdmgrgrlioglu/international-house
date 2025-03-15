package com.international_house.backend.core.security.filter;

import com.international_house.backend.core.RedisService;
import com.international_house.backend.core.security.jwt.JwtUtil;
import com.international_house.backend.entity.Employee;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final RedisService redisService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            Employee user = jwtUtil.extractEmployee(token);
            String userName = user.getName();
            String userId = user.getId().toString();

            if (userId != null && jwtUtil.validateToken(token, user.getId().toString())) {
                Employee employee = redisService.getSession(userId);
                if (employee != null) {
                    GrantedAuthority authorities = new SimpleGrantedAuthority("ROLE_" + employee.getRole().name());
                    UserDetails userDetails = User.withUsername(userName)
                            .password("N/A")
                            .authorities(authorities)
                            .build();

                    SecurityContextHolder.getContext().setAuthentication(
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()));
                }
            }

        }

        chain.doFilter(request, response);
    }
}
