package com.devf.hortilink.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "comercios_profiles")
public class ComercioProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Usuario user;
	
	private String nomeComercio;
	private Integer raioMaximoEntregaKm;
	private String cepBase;
	
	@OneToMany(mappedBy = "comercio", cascade = CascadeType.ALL)
    private List<Oferta> ofertas;

	@OneToMany(mappedBy = "comercioProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Foto> fotos;
	
	
	public void addOferta(Oferta oferta) {
		this.ofertas.add(oferta);
	}
	
	public void removeOferta(Oferta oferta) {
		this.ofertas.remove(oferta);
	}
	
	public void removeOferta(Long idOferta) {
		this.ofertas.removeIf(oferta -> oferta.getId().equals(idOferta));
	}
	
	//Getters e Setters
	public Long getId() {
		return id;
	}

	public List<Foto> getFotos() {
		return fotos;
	}

	public void setFotos(List<Foto> fotos) {
		this.fotos = fotos;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getUser() {
		return user;
	}

	public void setUser(Usuario user) {
		this.user = user;
	}

	public String getNomeComercio() {
		return nomeComercio;
	}

	public void setNomeComercio(String nomeComercio) {
		this.nomeComercio = nomeComercio;
	}

	public Integer getRaioMaximoEntregaKm() {
		return raioMaximoEntregaKm;
	}

	public void setRaioMaximoEntregaKm(Integer raioMaximoEntregaKm) {
		this.raioMaximoEntregaKm = raioMaximoEntregaKm;
	}

	public String getCepBase() {
		return cepBase;
	}

	public void setCepBase(String cepBase) {
		this.cepBase = cepBase;
	}

	public List<Oferta> getOfertas() {
		return ofertas;
	}

	public void setOfertas(List<Oferta> ofertas) {
		this.ofertas = ofertas;
	}
	
	
}
