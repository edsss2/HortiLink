package com.devf.hortilink.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Foto {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // --- Metadados da Imagem (Comuns a todas as imagens) ---
    
    @NotBlank
    @Column(name = "nome_arquivo", nullable = false, length = 255)
    private String nomeArquivo; 
    
    @NotBlank
    @Column(name = "caminho_arquivo", nullable = false, length = 500)
    private String caminhoArquivo; // URL ou path do arquivo
    
    @NotBlank
    @Column(name = "tipo_conteudo", nullable = false, length = 50)
    private String tipoConteudo; // MIME Type

    // --- Atributos de Venda/Contexto (Opcionais) ---

    // Este campo é importante para saber qual imagem aparece primeiro
    @Column(name = "ordem_exibicao") 
    private Integer ordemExibicao; // 1, 2, 3... (usado principalmente em Produtos)O
    
    
    // --- Relacionamentos Polimórficos (Múltiplas FKs Nuláveis) ---
    
    // 1. Imagem de Produto (Relacionamento: Um produto tem muitas Imagens)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id", nullable = true) // Esta FK é NULL quando a imagem for de outro tipo
    private Produto produto;
    
    // 2. Imagem de Perfil de Comércio (Relacionamento: Um perfil tem UMA Imagem)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comercio_profile_id", nullable = true)
    private ComercioProfile comercioProfile;
    
    // 3. Imagem de Perfil de Usuário (Opcional: se o avatar do User for separado do ComercioProfile)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true, unique = true)
    private Usuario usuario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomeArquivo() {
		return nomeArquivo;
	}

	public void setNomeArquivo(String nomeArquivo) {
		this.nomeArquivo = nomeArquivo;
	}

	public String getCaminhoArquivo() {
		return caminhoArquivo;
	}

	public void setCaminhoArquivo(String caminhoArquivo) {
		this.caminhoArquivo = caminhoArquivo;
	}

	public String getTipoConteudo() {
		return tipoConteudo;
	}

	public void setTipoConteudo(String tipoConteudo) {
		this.tipoConteudo = tipoConteudo;
	}

	public Integer getOrdemExibicao() {
		return ordemExibicao;
	}

	public void setOrdemExibicao(Integer ordemExibicao) {
		this.ordemExibicao = ordemExibicao;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public ComercioProfile getComercioProfile() {
		return comercioProfile;
	}

	public void setComercioProfile(ComercioProfile comercioProfile) {
		this.comercioProfile = comercioProfile;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
    
    
    
}
