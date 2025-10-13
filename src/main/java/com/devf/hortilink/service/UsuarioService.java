package com.devf.hortilink.service;

import java.util.List;

import com.devf.hortilink.entity.Usuario;

public interface UsuarioService {

	List<Usuario> listarTodos();
	Usuario buscarPorId(Long id);
	Usuario buscarPorEmail(String email);
	Usuario excluirPorId(Long id);
	Usuario salvar(Usuario usuario);
}
