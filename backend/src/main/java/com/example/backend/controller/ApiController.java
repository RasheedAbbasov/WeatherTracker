package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.WeatherService;



@RestController
public class ApiController {

    private final WeatherService weatherService;


    // @Value("${weather.api.key}")
    // private String apiKey;


    // @GetMapping("/env")
    // public String getApiKey() {
    //     return apiKey;
    // }

    public ApiController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/weather")
    public String getWeather(@RequestParam String city) {
        return weatherService.getCurrentWeather(city);

    }

}
