package br.com.mkdata.teste;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.web.config.EnableSpringDataWebSupport;


@SpringBootApplication
@EnableSpringDataWebSupport
@EnableCaching
public class MkdataApplication {
	public static void main(String[] args) {
		SpringApplication.run(MkdataApplication.class, args);
	}
}
