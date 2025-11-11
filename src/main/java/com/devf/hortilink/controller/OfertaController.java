package com.devf.hortilink.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devf.hortilink.dto.ProdutoCardDTO;
import com.devf.hortilink.entity.Oferta;
import com.devf.hortilink.service.OfertaService;

@RestController
@RequestMapping("/oferta")
public class OfertaController {

	@Autowired
	private OfertaService service;
	
	@GetMapping("/listar")
	public ResponseEntity<List<ProdutoCardDTO>> Listar() {
		List<ProdutoCardDTO> produtosCard = service.transformOfertas(service.listarTodos());
		return ResponseEntity.ok(produtosCard);
	}
	
	@PostMapping("/carrinho")
	public ResponseEntity<List<ProdutoCardDTO>> listarCarrinho(@RequestBody List<Long> ids) {
		List<ProdutoCardDTO> produtosCard = service.transformOfertas(service.buscarCarrinho(ids));
		return ResponseEntity.ok(produtosCard);
	}
	
	@PostMapping("/salvar")
	public ResponseEntity<Oferta> salvar(@RequestBody Oferta oferta) {
		Oferta salvo = service.salvar(oferta);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(salvo.getId())
				.toUri();
		
		return ResponseEntity.created(location).body(salvo);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Oferta> buscarPorId(@PathVariable Long id) {
		Oferta produto = service.buscarPorId(id);
		
		return ResponseEntity.ok(produto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluirPorId(@PathVariable Long id) {
		service.excluirPorId(id);
		
		return ResponseEntity.noContent().build();
	}
	
	
	
}
