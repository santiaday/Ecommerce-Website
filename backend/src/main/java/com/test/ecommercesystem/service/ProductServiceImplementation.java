package com.test.ecommercesystem.service;


import org.springframework.beans.factory.annotation.Autowired;
import com.test.ecommercesystem.repository.ProductRepo;
import com.test.ecommercesystem.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImplementation implements ProductService{

    @Autowired
    private ProductRepo productRepo;

    @Override
    public Product saveProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public String updateTable(Product product) {
        List<Product> products = new ArrayList<>();
        products = productRepo.findAll();

        for(Product p: products){
            if(p.getProductId() == product.getProductId()) {
                productRepo.save(p);
            }
        }
        return "Product has been added";
    }

}
