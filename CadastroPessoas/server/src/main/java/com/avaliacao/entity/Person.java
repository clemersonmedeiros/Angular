package com.avaliacao.entity;

import lombok.*;

import javax.persistence.Id;
import java.util.Date;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Entity;

/*
    Criado por Clémerson Medeiros no dia 11/07/2019
*/


// Entidade Pessoa
@Entity
@Data
@NoArgsConstructor
public class Person {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private @NonNull String name;
    private @NonNull String cpf;
    private @NonNull String email;
    private @NonNull Date birthDate; // Data de Aniversário
    private @NonNull boolean active; // false = excluído
}