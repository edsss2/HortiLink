package com.devf.hortilink.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devf.hortilink.entity.Endereco;
import com.devf.hortilink.entity.Foto;
import com.devf.hortilink.service.UsuarioService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/perfil")
public class UsuarioController {

	@Autowired
	private UsuarioService service;
	
	@PutMapping("/{id}/endereco")
	public ResponseEntity<Void> atualizarEndereco(@PathVariable Long id, @RequestBody Endereco endereco) {
		
		service.atualizarEndereco(id, endereco);
		
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/{id}/foto")
	public ResponseEntity<Void> atualizarEndereco(@PathVariable Long id, @RequestBody Foto foto) {
		
		service.atualizarFoto(id, foto);
		
		return ResponseEntity.ok().build();
	}
}
