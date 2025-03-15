package com.international_house.backend.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.international_house.backend.entity.Employee;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class RedisService {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper jacksonObjectMapper;

    public RedisService(StringRedisTemplate redisTemplate, ObjectMapper jacksonObjectMapper) {
        this.redisTemplate = redisTemplate;
        this.jacksonObjectMapper = jacksonObjectMapper;
    }

    public void saveSession(String userId, Employee employee) {
        try {
            String employeeString = jacksonObjectMapper.writeValueAsString(employee);
            redisTemplate.opsForValue().set(userId, employeeString, 60, TimeUnit.MINUTES);
        } catch (IOException e) {
            log.error("Failed to save session in Redis", e);  // Handle exception
        }
    }

    public Employee getSession(String userId) {
        String employeeString = redisTemplate.opsForValue().get(userId);
        if (employeeString != null) {
            try {
                return jacksonObjectMapper.readValue(employeeString, Employee.class);
            } catch (IOException e) {
                log.error("Failed to get session from Redis", e);  // Handle exception
            }
        }
        return null;
    }

    public void deleteSession(String userId) {
        redisTemplate.delete(userId);
    }
}