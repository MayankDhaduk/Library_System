package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.example.demo.model.Product;

public interface ProductService {

	public Product addProduct(Product product);

	public List<Product> viewAllProduct();

	public List<Product> viewProductByCategory(UUID categoryId);

	public void deleteById(UUID id);

	public Product productById(UUID id);

	public List<Product> getProductsByCategoryName(String catname);

//	 public Optional<Product> getProductById(UUID productId);
}
