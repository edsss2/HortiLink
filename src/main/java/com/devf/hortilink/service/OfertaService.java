package com.devf.hortilink.service;

import java.util.List;

import com.devf.hortilink.entity.Oferta;

public interface OfertaService {

	List<Oferta> listarTodos();
	Oferta buscarPorId(Long id);
	Oferta excluirPorId(Long id);
	Oferta salvar(Oferta oferta);
	
}
