package com.devf.hortilink.enums;

public enum Role {

	PRODUTOR("Produtor"),
	CONSUMIDOR("Consumidor"),
	COMERCIO("Comércio");
	
	private final String nome;
	
	Role(String nome) {
		this.nome = nome;
	}
	
	public String getNome() {
		return nome;
	}
	
}
