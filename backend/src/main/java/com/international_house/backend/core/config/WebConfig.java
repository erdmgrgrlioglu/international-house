package com.international_house.backend.core.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) { // if there is an annoying cors issue consider deleting or
                                                         // adding stuff here
        registry.addMapping("/**")
                .allowedOrigins("*") // Allow all origins
                .allowedMethods("GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS") // Allow these methods
                .allowedHeaders("*"); // Allow all headers
    }
}
