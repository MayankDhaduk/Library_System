package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.model.Cart;

public interface CartService {

	public Cart addCart(Cart cart);

	public List<Cart> viewAllCart();

	public List<Cart> cartByUser(UUID id);
	
	List<Cart> getCartByUser(UUID id);

}
