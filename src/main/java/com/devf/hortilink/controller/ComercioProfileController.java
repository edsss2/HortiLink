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

import com.devf.hortilink.entity.ComercioProfile;
import com.devf.hortilink.entity.Foto;
import com.devf.hortilink.entity.Oferta;
import com.devf.hortilink.service.ComercioProfileService;

@RestController
@RequestMapping("/comercio")
public class ComercioProfileController {

	@Autowired
	private ComercioProfileService service;
	
	@GetMapping("/listar")
	public ResponseEntity<List<ComercioProfile>> ListarComercios() {
		List<ComercioProfile> comercios = service.listarTodos();
		
		return ResponseEntity.ok(comercios);
	}
	
	@PostMapping("/salvar")
	public ResponseEntity<ComercioProfile> salvarComercio(@RequestBody ComercioProfile comercio) {
		ComercioProfile salvo = service.salvar(comercio);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(salvo.getId())
				.toUri();
		
		return ResponseEntity.created(location).body(salvo);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ComercioProfile> buscarPorId(@PathVariable Long id) {
		ComercioProfile produto = service.buscarPorId(id);
		
		return ResponseEntity.ok(produto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluirPorId(@PathVariable Long id) {
		service.excluirPorId(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}/fotos")
	public ResponseEntity<List<Foto>> fotosComercio(@PathVariable Long id) {
		List<Foto> fotos = service.buscarFotosPorId(id);
		
		return ResponseEntity.ok(fotos);
	}
	
	@GetMapping("/{id}/ofertas")
	public ResponseEntity<List<Oferta>> ofertasComercio(@PathVariable Long id) {
		List<Oferta> ofertas = service.buscarOfertasPorId(id);
		
		return ResponseEntity.ok(ofertas);
	}
	
	
	
}
