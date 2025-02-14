package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

	private static final String UPLOAD_DIR = "uploads/";

	@Autowired
	CategoryService categoryService;

	@Autowired
	ProductService productService;

	@PostMapping("/addcat")
	public Category addCategory(@RequestBody Category category) {
		return categoryService.addCategory(category);
	}

	@GetMapping("/viewcat")
	public ResponseEntity<List<Category>> getCategory() {
		List<Category> categories = categoryService.viewAllCategory();

		for (Category category : categories) {
			for (Product product : category.getProduct()) {
				if (product.getPimage() != null) {
					product.setImageUrl("http://localhost:2025/images/" + product.getId() + ".jpg");
				}
			}
		}
		return ResponseEntity.ok(categories);
	}

	@DeleteMapping("/deletecat/{id}")
	public void deleteUser(@PathVariable UUID id) {
		categoryService.deleteUser(id);
	}

//	@PostMapping(value = "/addproduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//	public ResponseEntity<?> addProduct(@RequestParam("pname") String pname, @RequestParam("pprice") String pprice,
//			@RequestParam("pqty") String pqty, @RequestParam("pauthor") String pauthor,
//			@RequestParam("planguage") String planguage, @RequestParam("pdescription") String pdescription,
//			@RequestParam(value = "image", required = false) MultipartFile image, @RequestParam("catid") UUID id) {
//
//		try {
//			String imageUrl = null;
//
//			// ✅ Save image and get URL
//			if (image != null && !image.isEmpty()) {
//				String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
//				Path filePath = Paths.get(UPLOAD_DIR, fileName);
//
//				Files.createDirectories(filePath.getParent()); // Ensure folder exists
//				Files.write(filePath, image.getBytes()); // Save image
//
//				imageUrl = "http://localhost:2025/uploads/" + fileName; // ✅ Set image URL
//			}
//
//			Product product = new Product();
//			product.setPname(pname);
//			product.setPprice(pprice);
//			product.setPqty(pqty);
//			product.setPauthor(pauthor);
//			product.setPlanguage(planguage);
//			product.setPdescription(pdescription);
//			product.setImageUrl(imageUrl); // ✅ Set image URL
//			Category category = categoryService.getById(id);
//			product.setCategory(category);
//
//			productService.addProduct(product);
//
//			return ResponseEntity.ok("Product added successfully!");
//
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving product.");
//		}
//	}

	@PostMapping(value = "/addproduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Product addProduct(@RequestParam("pname") String pname, @RequestParam("pprice") String pprice,
			@RequestParam("pqty") String pqty, @RequestParam("pauthor") String pauthor,
			@RequestParam("planguage") String planguage, @RequestParam("pdescription") String pdescription,
			@RequestParam(value = "pimage", required = false) MultipartFile pimage, @RequestParam("catid") UUID id) {

		Product product = new Product();

		try {
			String base64Image = Base64.getEncoder().encodeToString(pimage.getBytes());

			product.setPname(pname);
			product.setPprice(pprice);
			product.setPqty(pqty);
			product.setPauthor(pauthor);
			product.setPlanguage(planguage);
			product.setPdescription(pdescription);
			product.setPimage(base64Image);
			Category category = categoryService.getById(id);
			product.setCategory(category);

		} catch (Exception e) {
			// TODO: handle exception
		}

		return productService.addProduct(product);

	}

	@GetMapping("/viewproduct")
	public List<Product> viewAllProduct() {
		return productService.viewAllProduct();
	}

	@DeleteMapping("/deleteproduct/{id}")
	public void deleteProduct(@PathVariable UUID id) {
		productService.deleteById(id);
	}

}
