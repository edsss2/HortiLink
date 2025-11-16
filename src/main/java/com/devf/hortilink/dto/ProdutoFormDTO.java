package com.devf.hortilink.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProdutoFormDTO {

	private Long id;
	private String nome;
	private String descricao;
	private LocalDate dataColheira;
	private Boolean isOrganico;
	private String categoria;
	private String unidadeMedida;
	private BigDecimal preco;
	private BigDecimal promocao;
	private Integer quantidade;
	
	
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
	public LocalDate getDataColheira() {
		return dataColheira;
	}
	public void setDataColheira(LocalDate dataColheira) {
		this.dataColheira = dataColheira;
	}
	public Boolean getIsOrganico() {
		return isOrganico;
	}
	public void setIsOrganico(Boolean isOrganico) {
		this.isOrganico = isOrganico;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getUnidadeMedida() {
		return unidadeMedida;
	}
	public void setUnidadeMedida(String unidadeMedida) {
		this.unidadeMedida = unidadeMedida;
	}
	public BigDecimal getPreco() {
		return preco;
	}
	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}
	public BigDecimal getPromocao() {
		return promocao;
	}
	public void setPromocao(BigDecimal promocao) {
		this.promocao = promocao;
	}
	public Integer getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}
		
	
	
}
