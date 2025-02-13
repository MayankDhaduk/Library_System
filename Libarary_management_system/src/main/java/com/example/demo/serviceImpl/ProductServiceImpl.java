package com.example.demo.serviceImpl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Category;
import com.example.demo.model.Product;
import com.example.demo.repo.ProductRepo;
import com.example.demo.service.CategoryService;
import com.example.demo.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductRepo productRepo;

	@Autowired
	CategoryService categoryService;

	@Override
	public Product addProduct(Product product) {

		return productRepo.save(product);
	}

	@Override
	public List<Product> viewAllProduct() {

		return productRepo.findAll();
	}

	@Override
	public List<Product> viewProductByCategory(UUID categoryId) {
		Category category = categoryService.getById(categoryId);
		return productRepo.findByCategory(category);
	}

}
