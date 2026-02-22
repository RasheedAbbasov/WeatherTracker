package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getCurrentWeather(String city) {
        String url = String.format("%s/current.json?key=%s&q=%s", baseUrl, apiKey, city);
        return restTemplate.getForObject(url, String.class);
    }
}
