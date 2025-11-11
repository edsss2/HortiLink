package com.devf.hortilink.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.devf.hortilink.dto.ProdutoCardDTO;
import com.devf.hortilink.entity.Oferta;
import com.devf.hortilink.repository.OfertaRepository;
import com.devf.hortilink.service.OfertaService;

@Service
public class OfertaServiceImpl implements OfertaService {
	
	@Autowired
	private OfertaRepository repository;

	@Override
	public List<Oferta> listarTodos() {
		return repository.findAll();
	}

	@Override
	public Oferta buscarPorId(Long idOferta) {
		return repository.findById(idOferta).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Oferta não encontrada com o ID: " + idOferta));
	}

	@Override
	public Oferta excluirPorId(Long id) {
		Oferta oferta = buscarPorId(id);
		repository.delete(oferta);
		return oferta;
	}

	@Override
	public Oferta salvar(Oferta oferta) {
		return repository.save(oferta);
	}

	@Override
	public List<Oferta> buscarCarrinho(List<Long> ids) {
		return repository.findByProdutoIdIn(ids);
	}
	
	
	public List<ProdutoCardDTO> transformOfertas(List<Oferta> ofertas) {
		return ofertas.stream()
				.map(o -> ProdutoCardDTO.fromOferta(o))
				.collect(Collectors.toList());
	}
	
	

}
