package com.example.demo.serviceImpl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Cart;
import com.example.demo.model.User;
import com.example.demo.repo.CartRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.CartService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	CartRepo cartRepo;

	@Autowired
	UserRepo userRepo;

	@Override
	public Cart addCart(Cart cart) {

		return cartRepo.save(cart);
	}

	@Override
	public List<Cart> viewAllCart() {

		return cartRepo.findAll();
	}

	@Override
	public List<Cart> cartByUser(UUID id) {

		User user = userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found ID : " + id));

		return cartRepo.findByUser(user);
	}

	@Override
	public List<Cart> getCartByUser(UUID id) {

		return cartRepo.findByUserId(id);
	}

}
