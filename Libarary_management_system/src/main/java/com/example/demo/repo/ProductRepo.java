package com.example.demo.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Category;
import com.example.demo.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, UUID> {

	List<Product> findByCategory(Category category);

//	Product getProductById(UUID productId);


}
