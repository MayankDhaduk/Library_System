package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.model.Category;

public interface CategoryService {

	public Category addCategory(Category category);

	public List<Category> viewAllCategory();

	public void deleteUser(UUID id);
	
	public Category getById(UUID id);

}
