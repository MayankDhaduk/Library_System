package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.example.demo.model.Cart;
import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.service.CartService;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	ProductService productService;

	@Autowired
	CartService cartService;

	/*--------- USER START---------*/

	@PostMapping("/register")
	public User addUser(@RequestBody User user) {
		return userService.AddUser(user);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> user) {
		String uname = user.get("uname");
		String pass = user.get("pass");

		UUID userLog = userService.userLogin(uname, pass);

		Map<String, Object> response = new HashMap<>();

		if (userLog != null) {
			response.put("success", true);
			response.put("userId", userLog.toString());
			response.put("message", "User Login Successfully");
			return ResponseEntity.ok(response);
		} else {
			response.put("success", false);
			response.put("message", "Invalid User. Please Login First!");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}

	@GetMapping("/userid")
	public ResponseEntity<Map<String, String>> getUserId(@RequestParam String uname) {
		UUID userId = userService.getUserIdByUsername(uname);
		if (userId != null) {
			Map<String, String> response = new HashMap<>();
			response.put("userId", userId.toString());
			return ResponseEntity.ok(response);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@GetMapping("/viewuser")
	public List<User> viewAllUser() {
		return userService.viewallUser();
	}

	@DeleteMapping("/delete/{id}")
	public void deleteUser(@PathVariable UUID id) {
		userService.deleteUser(id);
	}

	@GetMapping("/getuserbyId")
	public User getUserById(@RequestParam("uid") UUID id) {
		return userService.getById(id);
	}

	/*--------- USER END---------*/

	/*--------- PRODUCT START----------*/

	@GetMapping("/viewproduct")
	public List<Product> viewallProduct() {
		return productService.viewAllProduct();
	}

//	@GetMapping("/getproduct/{productId}")
//	public ResponseEntity<?> getProductById(@PathVariable("pid") UUID productId) {
//		Optional<Product> product = productService.getProductById(productId);
//		System.err.println("product ID IS : " + productId);
//
//		if (product.isPresent()) {
//			return ResponseEntity.ok(product.get());
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product with ID " + productId + " not found.");
//		}
//	}
	/*--------- PRODUCT END----------*/

	/*---------- CART START-----------*/

	@PostMapping("/addcart")
	public ResponseEntity<?> addcart(@RequestParam("uid") UUID userId, @RequestParam("pid") UUID productId) {

		User user = userService.getById(userId);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");

		}

		Product product = productService.productById(productId);
		if (product == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found!");

		}

		Cart cart = new Cart();
		cart.setProduct(product);
		cart.setUser(user);
		cart.setQty("1");
		cartService.addCart(cart);
//		cartService.getCartByUser(userId);
		System.err.println("Userid is : " + userId);
		System.err.println("Productid is : " + productId);
		return ResponseEntity.ok(cart);
	}

	@GetMapping("/viewcart")
	public List<Cart> getCartItems(@RequestParam("uid") UUID userId) {

		return cartService.getCartByUser(userId);
	}

	@GetMapping("/viewallcart")
	public List<Cart> viewAllCart() {
		return cartService.viewAllCart();
	}

	/*---------- CART END-----------*/

//	@PostMapping("/login")
//	public Map<String, String> login(@RequestBody Map<String, String> user) {
//
//		String uname = user.get("uname");
//		String pass = user.get("pass");
//
//		boolean userLog = userService.userLogin(uname, pass);
//
//		Map<String, String> response = new HashMap();
//		if (userLog) {
//			response.put("message", "User Login Successfully");
//		} else {
//			response.put("message", "Invalid User Please Login First!!");
//		}
//
//		return response;
//
//	}

}