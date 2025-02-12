package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.model.User;

public interface UserService {

	public User AddUser(User user);

	public List<User> viewallUser();

	public void deleteUser(UUID id);

	public boolean userLogin(String uname, String pass);

}
