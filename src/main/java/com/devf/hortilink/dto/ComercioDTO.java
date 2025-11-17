package com.devf.hortilink.dto;

public class ComercioDTO {
	
	private Long id;
	
	private String nome;
	private Integer raioMaximoEntregaKm;
	private String rua;
	private String estado;
	private String numero;
	private String cep;
	private String complemento;
	private String cidade;
	private String bairro;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Integer getRaioMaximoEntregaKm() {
		return raioMaximoEntregaKm;
	}
	public void setRaioMaximoEntregaKm(Integer raioMaximoEntregaKm) {
		this.raioMaximoEntregaKm = raioMaximoEntregaKm;
	}
	public String getRua() {
		return rua;
	}
	public void setRua(String rua) {
		this.rua = rua;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public String getComplemento() {
		return complemento;
	}
	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	
	
	
}
