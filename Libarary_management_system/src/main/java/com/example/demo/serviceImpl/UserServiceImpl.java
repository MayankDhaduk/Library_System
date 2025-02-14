package com.example.demo.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepo userRepo;

	@Override
	public User AddUser(User user) {

		return userRepo.save(user);
	}

	@Override
	public List<User> viewallUser() {

		return userRepo.findAll();
	}

	@Override
	public void deleteUser(UUID id) {

		userRepo.deleteById(id);
	}

	@Override
	public User getById(UUID id) {

		return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
	}

	@Override
	public UUID userLogin(String uname, String pass) {

		Optional<User> user = userRepo.findByUname(uname);
		if (user.isPresent() && user.get().getPass().equals(pass)) {
			return user.get().getId();
		}

		return null;
	}

	@Override
	public UUID getUserIdByUsername(String uname) {
		Optional<User> user = userRepo.findByUname(uname);
		return (user != null) ? user.get().getId() : null;
	}

}
