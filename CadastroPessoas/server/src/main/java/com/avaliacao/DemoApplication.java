package com.avaliacao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.Date;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import java.util.stream.Stream;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.core.Ordered;
import com.avaliacao.entity.Person;
import java.util.Collections;
import com.avaliacao.repository.PersonRepository;

/*
    Criado por Clémerson Medeiros no dia 11/07/2019
    Alterado por Clémerson Medeiros no dia 13/07/2019 -- Adicionado  simpleCorsFilter() 
*/

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

    // Permite a integração do Spring Security
    @Bean
    public FilterRegistrationBean<CorsFilter> simpleCorsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

    // Inicia a aplicação
	@Bean
    ApplicationRunner init(PersonRepository repository) {
        
        return args -> {
            //repository.findAll().forEach(System.out::println); // Print todos as pessoas
        };
    }
}
