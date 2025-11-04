package com.devf.hortilink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devf.hortilink.entity.ComercioProfile;

@Repository
public interface ComercioProfileRepository extends JpaRepository<ComercioProfile, Long> {

}
