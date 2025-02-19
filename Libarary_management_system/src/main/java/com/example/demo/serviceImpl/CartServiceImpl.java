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
		// TODO Auto-generated method stub
		return cartRepo.save(cart);
	}

	@Override
	public List<Cart> getCartByUser(UUID id) {
		// TODO Auto-generated method stub
		return cartRepo.findByUserId(id);
	}

	@Override
	public List<Cart> viewCart() {
		// TODO Auto-generated method stub
		return cartRepo.findAll();
	}
}
