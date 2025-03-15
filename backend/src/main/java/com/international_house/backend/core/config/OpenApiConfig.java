package com.international_house.backend.core.config;

import com.international_house.backend.constants.SwaggerConstants;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title(SwaggerConstants.API_TITLE)
                        .version(SwaggerConstants.API_VERSION)
                        .description(SwaggerConstants.API_DESCRIPTION))
                .addSecurityItem(new SecurityRequirement().addList(SwaggerConstants.AUTH_TYPE))
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes(SwaggerConstants.AUTH_TYPE,
                                new SecurityScheme()
                                        .name(SwaggerConstants.AUTH_TYPE)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme(SwaggerConstants.AUTH_SCHEME)
                                        .bearerFormat(SwaggerConstants.AUTH_BEARER_FORMAT)));
    }
}
