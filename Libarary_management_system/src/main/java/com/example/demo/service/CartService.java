package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.model.Cart;
import com.example.demo.model.Product;

public interface CartService {

	public Cart addCart(Cart cart);

	List<Cart> getCartByUser(UUID id);
	
	public List<Cart> viewCart();
}
