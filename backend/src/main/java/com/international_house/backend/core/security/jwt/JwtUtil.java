package com.international_house.backend.core.security.jwt;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.international_house.backend.entity.Employee;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    private final ObjectMapper jacksonObjectMapper;

    public String generateToken(Employee employee) {
        JavaType mapType = jacksonObjectMapper.getTypeFactory().constructMapType(Map.class, String.class, Object.class);
        Map<String, Object> claims = jacksonObjectMapper.convertValue(employee, mapType);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setSubject(employee.getId().toString())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
    }

    public String extractUserId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Employee extractEmployee(String token) {
        Map<String, Object> claims = extractClaim(token, claim -> claim);
        claims.remove("password");
        return jacksonObjectMapper.convertValue(claims, Employee.class);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    public boolean validateToken(String token, String userId) {
        return (extractUserId(token).equals(userId) && !extractExpiration(token).before(new Date()));
    }
}