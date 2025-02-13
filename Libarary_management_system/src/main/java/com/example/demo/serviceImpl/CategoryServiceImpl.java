package com.example.demo.serviceImpl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Category;
import com.example.demo.repo.CategoryRepo;
import com.example.demo.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryRepo categoryRepo;

	@Override
	public Category addCategory(Category category) {

		return categoryRepo.save(category);
	}

	@Override
	public List<Category> viewAllCategory() {

		return categoryRepo.findAll();
	}

	@Override
	public void deleteUser(UUID id) {

		categoryRepo.deleteById(id);
	}

	@Override
	public Category getById(UUID id) {

		return categoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Category Not Found"));
	}

}
