package com.devf.hortilink.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Injeta o mesmo valor do seu application.properties
    @Value("${storage.location}")
    private String storageLocation;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        
        // Define o padrão de URL que o frontend vai usar
        String urlPath = "/uploads/**"; 
        
        // Define o local no disco onde o Spring deve procurar os arquivos
        // O "file:" é obrigatório para indicar que é um caminho do sistema de arquivos
        String diskLocation = "file:" + storageLocation + "/";

        registry
            .addResourceHandler(urlPath) // → Se a URL for /uploads/...
            .addResourceLocations(diskLocation); // → Sirva o arquivo de file:./uploads/
    }
}
