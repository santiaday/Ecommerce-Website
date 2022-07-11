package com.test.ecommercesystem.service;

import com.test.ecommercesystem.model.Product;

import java.util.List;

public interface ProductService {
    public Product saveProduct(Product product);

    public List<Product> getAllProducts();

    public String updateTable(Product product);
}
