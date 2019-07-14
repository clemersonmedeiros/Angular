package com.avaliacao.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.avaliacao.entity.Person;

/*
    Criado por Clémerson Medeiros no dia 11/07/2019
    Alterado por Clémerson Medeiros no dia 12/07/2019 -- Acrescentado @CrossOrigin(origins = "http://localhost:4200")
    Alterado por Clémerson Medeiros no dia 14/07/2019 -- Acrescentado existsByCpf(...)
*/

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface PersonRepository extends JpaRepository<Person, Long> {


    // SELECT se existe pessoas com outro ID que possuam o msm CPF 
    @Query("SELECT COUNT(1) > 0 FROM Person WHERE cpf = :cpf AND active = true AND id <> :id")
    boolean existsByCpf( @Param("cpf") String cpf, @Param("id") Long id);

}