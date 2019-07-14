import { Component, OnDestroy,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../shared/person/person.service';
import { FormGroup,Validators, FormControl,FormBuilder} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from '../providers/date.adapter';
import { ValidateCPF} from '../providers/validate.cpf';

/*
  Criado por Clémerson Medeiros no dia 12/07/2019
  Alterado por Clémerson Medeiros no dia 14/07/2019 -- Acrescentado existsByCpf() na função Save()
*/

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter},{ provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class PersonEditComponent implements OnInit, OnDestroy {

  ngFormControll: FormGroup;
  sub: Subscription;
  today = new Date();
  birthDateFilter = new FormControl(); 


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private personService: PersonService) { 
    
    
    this.ngFormControll = this.fb.group({ /*Adiciona os validadores*/
      id: '',
      name: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(150)])],
      cpf: ['',[Validators.required,ValidateCPF.validCPF]],
      href: '',
      email: ['',[Validators.required,Validators.email]]
    });   
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.personService.get(id).subscribe((person: any) => {
          if (person) {
            this.ngFormControll.get('id').patchValue(params['id']);
            this.ngFormControll.get('cpf').patchValue(person.cpf);
            this.ngFormControll.get('name').patchValue(person.name);
            this.ngFormControll.get('href').patchValue(person._links.self.href);
            this.ngFormControll.get('email').patchValue(person.email);
            this.birthDateFilter.patchValue(new Date(person.birthDate));
          } else {
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Volta para a lista de pessoas
  gotoList() {
    this.router.navigate(['/person-list']);
  }

  // Bloqueia datas de nascimentos maiores que a data atual
  blockDate = (d: Date): boolean => {
    return d <= this.today;
  }

  // Salvar pessoa
  save() {
    var person = this.ngFormControll.value;
    person['birthDate'] = this.birthDateFilter.value;
    this.personService.existsByCpf(person).subscribe(result => {
      if (!result){
        this.personService.save(person).subscribe(result => {
          this.gotoList();
        }, error => console.error(error));
      }else{
        alert('Já existe uma pessoa cadastrada com esse CPF')
      }
    }, error => console.error(error));
  }
}