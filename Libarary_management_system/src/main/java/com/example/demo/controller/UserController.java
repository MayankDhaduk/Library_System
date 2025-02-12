package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/register")
	public User addUser(@RequestBody User user) {
		return userService.AddUser(user);
	}

	@PostMapping("/login")
	public Map<String, String> login(@RequestBody Map<String, String> user) {

		String uname = user.get("uname");
		String pass = user.get("pass");

		boolean userLog = userService.userLogin(uname, pass);

		Map<String, String> response = new HashMap();
		if (userLog) {
			response.put("message", "User Login Successfully");
		} else {
			response.put("message", "Invalid User Please Login First!!");
		}

		return response;

	}

	@GetMapping("/viewuser")
	public List<User> viewAllUser() {
		return userService.viewallUser();
	}

	@DeleteMapping("/delete/{id}")
	public void deleteUser(@PathVariable UUID id) {
		userService.deleteUser(id);
	}

}
