package com.devf.hortilink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devf.hortilink.entity.Foto;

@Repository
public interface FotoRepository extends JpaRepository<Foto, Long> {

}
