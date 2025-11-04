package com.devf.hortilink.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.devf.hortilink.entity.Foto;
import com.devf.hortilink.repository.FotoRepository;
import com.devf.hortilink.service.FotoService;

@Service
public class FotoServiceImpl implements FotoService {

	@Autowired
	private FotoRepository repository;

	@Override
	public Foto buscarPorId(Long id) {
		return repository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Foto não encontrada com o ID: " + id));
	}

	@Override
	public Foto excluirPorId(Long id) {
		Foto foto = buscarPorId(id);
		repository.delete(foto);
		return foto;
	}

	@Override
	public Foto salvar(Foto foto) {
		return repository.save(foto);
	}

	@Override
	public String buscarUrlPorId(Long id) {
		Foto foto = buscarPorId(id);
		return foto.getCaminhoArquivo();
	}
	
	
}
