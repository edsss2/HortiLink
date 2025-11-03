package com.devf.hortilink.entity;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.devf.hortilink.enums.Categoria;
import com.devf.hortilink.enums.UnidadeMedida;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

@Entity
public class Produto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String nome;
	
	@Size(max = 250)
	private String descricao;
	
	@PastOrPresent
    @DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataColheita;
	

	private Boolean certificadoOrganico;
	
	@Enumerated(EnumType.STRING)
	@NotNull
	private Categoria categoria;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "unidade_medida")
	@NotNull
    private UnidadeMedida unidadeMedida;

	
	
	
	//Getters e Setters
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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getDataColheita() {
		return dataColheita;
	}

	public void setDataColheita(LocalDate dataColheita) {
		this.dataColheita = dataColheita;
	}

	public Boolean getCertificadoOrganico() {
		return certificadoOrganico;
	}

	public void setCertificadoOrganico(Boolean certificadoOrganico) {
		this.certificadoOrganico = certificadoOrganico;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public UnidadeMedida getUnidadeMedida() {
		return unidadeMedida;
	}

	public void setUnidadeMedida(UnidadeMedida unidadeMedida) {
		this.unidadeMedida = unidadeMedida;
	}
	
	
}
