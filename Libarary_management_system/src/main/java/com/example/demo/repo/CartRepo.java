package com.example.demo.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Cart;
import com.example.demo.model.User;

@Repository
public interface CartRepo extends JpaRepository<Cart, UUID> {

	@Query("from Cart c where c.user = :user")
	List<Cart> findByUser(@Param("user") User user);

	List<Cart> findByUserId(UUID userId);
}
