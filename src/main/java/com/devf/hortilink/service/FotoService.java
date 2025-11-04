package com.devf.hortilink.service;

import com.devf.hortilink.entity.Foto;

public interface FotoService {
	
	Foto buscarPorId(Long id);
	Foto excluirPorId(Long id);
	Foto salvar(Foto foto);
	String buscarUrlPorId(Long id);
	
	
}
