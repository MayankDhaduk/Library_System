package com.example.demo.repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, UUID> {
	
	Optional<Category> findByCatname(String catname);
	
}
