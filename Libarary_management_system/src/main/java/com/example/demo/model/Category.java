package com.example.demo.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {

	@Id
	@GeneratedValue
	@Column(columnDefinition = "BINARY(16)")
	private UUID catId;
	@Column(name = "catname")
	private String catname;

	public UUID getCatId() {
		return catId;
	}

	public void setCatId(UUID catId) {
		this.catId = catId;
	}

	public String getCatname() {
		return catname;
	}

	public void setCatname(String catname) {
		this.catname = catname;
	}

}
