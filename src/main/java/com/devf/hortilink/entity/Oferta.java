package com.devf.hortilink.entity;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "ofertas")
public class Oferta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comercio_profile_id", nullable = false)
    private ComercioProfile comercio;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;
	
	@DecimalMin("0.01")
	private BigDecimal valor;
	@DecimalMin("0.00")
	private BigDecimal promocao;
	
	@NotNull
    @DecimalMin("0.00")
    private BigDecimal estoqueAtual; 
    
    private Boolean disponivelParaVenda = true;

    
    
    
	//Getters e Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ComercioProfile getComercio() {
		return comercio;
	}

	public void setComercio(ComercioProfile comercio) {
		this.comercio = comercio;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public BigDecimal getPromocao() {
		return promocao;
	}

	public void setPromocao(BigDecimal promocao) {
		this.promocao = promocao;
	}

	public BigDecimal getEstoqueAtual() {
		return estoqueAtual;
	}

	public void setEstoqueAtual(BigDecimal estoqueAtual) {
		this.estoqueAtual = estoqueAtual;
	}

	public Boolean getDisponivelParaVenda() {
		return disponivelParaVenda;
	}

	public void setDisponivelParaVenda(Boolean disponivelParaVenda) {
		this.disponivelParaVenda = disponivelParaVenda;
	}
    
}
