package com.devf.hortilink.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devf.hortilink.entity.Foto;
import com.devf.hortilink.entity.Produto;
import com.devf.hortilink.service.ProdutoService;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

	@Autowired
	private ProdutoService service;
	
	@GetMapping("/listar")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<Produto>> listarProdutos() {
		List<Produto> produtos = service.listarTodos();
		
		return ResponseEntity.ok(produtos);
	}
	
	@PostMapping("/salvar")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Produto> salvarProduto(@RequestBody Produto produto) {
		Produto salvo = service.salvar(produto);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(salvo.getId())
				.toUri();
		
		return ResponseEntity.created(location).body(salvo);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
		Produto produto = service.buscarPorId(id);
		
		return ResponseEntity.ok(produto);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Void> excluirPorId(@PathVariable Long id) {
		service.excluirPorId(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}/fotos")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<Foto>> fotosProduto(@PathVariable Long id) {
		List<Foto> fotos = service.buscarFotosPorId(id);
		
		return ResponseEntity.ok(fotos);
	}
	
}
