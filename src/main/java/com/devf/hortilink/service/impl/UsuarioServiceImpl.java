package com.devf.hortilink.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.devf.hortilink.entity.Endereco;
import com.devf.hortilink.entity.Foto;
import com.devf.hortilink.entity.Usuario;
import com.devf.hortilink.repository.UsuarioRepository;
import com.devf.hortilink.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository repository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<Usuario> listarTodos() {
		return repository.findAll();
	}

	@Override
	public Usuario buscarPorId(Long id) {
		return repository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado com ID: " + id));
	}

	@Override
	public Usuario buscarPorEmail(String email) {
		return repository.findByEmail(email).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado com email: " + email));
	}

	@Override
	public Usuario excluirPorId(Long id) {
		Usuario usuario = buscarPorId(id);
		repository.delete(usuario);
		return usuario;

	}

	@Override
	public Usuario salvar(Usuario usuario) {
		usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
		return repository.save(usuario);
	}
	
	@Override
	public Foto buscarFotoPorId(Long id) {
		Usuario usuario = repository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado com ID: " + id));
		
		return usuario.getFoto();
	}

	@Override
	public void atualizarEndereco(Long id, Endereco endereco) {
		Usuario usuario = buscarPorId(id);
		usuario.setEndereco(endereco);
		
	}

	@Override
	public void atualizarFoto(Long id, Foto foto) {
		// TODO Auto-generated method stub
		
	}

}
