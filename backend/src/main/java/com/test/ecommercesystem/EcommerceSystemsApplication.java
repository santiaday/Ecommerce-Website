package com.test.ecommercesystem;

import com.test.ecommercesystem.service.ProductServiceImplementation;
import com.test.ecommercesystem.service.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import static java.lang.System.getProperty;

@SpringBootApplication
@RestController
public class EcommerceSystemsApplication {

	@Autowired
	private UserServiceImplementation userServiceImplementation;

	@Autowired
	private ProductServiceImplementation productServiceImplementation;

	public static void main(String[] args) {
		SpringApplication.run(EcommerceSystemsApplication.class, args);
	}


}
