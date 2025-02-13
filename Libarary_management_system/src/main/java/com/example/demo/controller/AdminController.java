package com.example.demo.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Category;
import com.example.demo.model.Product;
import com.example.demo.service.CategoryService;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

	@Autowired
	CategoryService categoryService;

	@Autowired
	ProductService productService;

	@PostMapping("/addcat")
	public Category addCategory(@RequestBody Category category) {
		return categoryService.addCategory(category);
	}

	@GetMapping("/viewcat")
	public List<Category> viewallCategory() {
		return categoryService.viewAllCategory();
	}

	@DeleteMapping("/deletecat/{id}")
	public void deleteUser(@PathVariable UUID id) {
		categoryService.deleteUser(id);
	}

	@PostMapping(value = "/addproduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Product addProduct(@RequestParam("pname") String pname, @RequestParam("pprice") String price,
			@RequestParam("pqty") String pqty, @RequestParam("pauthor") String pauthor,
			@RequestParam("planguage") String planguage, @RequestParam("pimage") MultipartFile pimage,
			@RequestParam("pdescription") String pdescription, @RequestParam("catid") UUID id) throws IOException {

		Product product = new Product();
		product.setPname(pname);
		product.setPprice(price);
		product.setPqty(pqty);
		product.setPauthor(pauthor);
		product.setPlanguage(planguage);
		product.setPdescription(pdescription);
		Category category = categoryService.getById(id);
		product.setCategory(category);

		if (pimage != null && !pimage.isEmpty()) {
			String base64Image = Base64.getEncoder().encodeToString(pimage.getBytes());
			product.setPimage(base64Image);
		} else {
			product.setPimage(null);
		}

		return productService.addProduct(product);

	}
	
	@GetMapping("/viewproduct")
	public List<Product> viewAllProduct()
	{
		return productService.viewAllProduct();
	}

}
