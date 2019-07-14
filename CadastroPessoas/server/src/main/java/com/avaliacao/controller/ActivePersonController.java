package com.avaliacao.controller;

import com.avaliacao.entity.Person;
import com.avaliacao.repository.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collection;
import java.util.stream.Collectors;

/*
    Criado por Clémerson Medeiros no dia 11/07/2019
    Alterado por Clémerson Medeiros no dia 12/07/2019 -- Acrescentado @CrossOrigin(origins = "http://localhost:4200")
    Alterado por Clémerson Medeiros no dia 14/07/2019 -- Acrescentado existsByCpf(...)
*/

@RestController

public class ActivePersonController {
    private PersonRepository repository;

    public ActivePersonController(PersonRepository repository) {
        this.repository = repository;
    }

    // Get todas as pessoas
    @GetMapping("/active-persons")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Person> activePersons() {
        return repository.findAll().stream()
                .filter(this::isActive)
                .collect(Collectors.toList());
    }

    // Verifica CPF
    @RequestMapping(value= "/cpf-persons", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:4200")
    public boolean existsByCpf(@RequestParam(value = "cpf", required = true) String cpf,@RequestParam(value = "id", required = true) Long id){
        return repository.existsByCpf(cpf,id);
    }
    

    // Caso a pessoa esteja inativa, não deverá aparecer nas consultas
    private boolean isActive(Person person) {
        return person.isActive();
    }
}