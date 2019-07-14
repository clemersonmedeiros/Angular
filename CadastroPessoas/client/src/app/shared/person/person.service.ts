import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
    Criado por Clémerson Medeiros no dia 12/07/2019
    Alterado por Clémerson Medeiros no dia 14/07/2019 -- Acrescentado existsByCpf(...)
*/

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  public API = '//localhost:8080'; // Local do server
  public PERSON_API = this.API + '/persons';


  constructor(private http: HttpClient) {
  }

  // pega todos as pessoas
  getAll(): Observable<any> {
    return this.http.get(this.API +'/active-persons');
  }

  // pega informações da pessoa por ID
  get(id: string) {
    return this.http.get(this.PERSON_API + '/' + id);
  }

  // verifica se já existe outra pessoa com esse CPF
  existsByCpf(person: any) {
    return this.http.get(this.API +'/cpf-persons?cpf='+person.cpf+'&id='+person.id);
  }

  // inclui ou altera as informações da pessoa
  save(person: any): Observable<any> {
    let result: Observable<Object>;
    person['active'] = true;
    if (person['href']) {
      result = this.http.put(person.href, person);
    } else {
      result = this.http.post(this.PERSON_API, person);
    }
    return result;
  }

  // remove a pessoa (active = false)
  remove(person: any) {
    person['active'] = false;
    person['href'] = this.PERSON_API + '/' +person.id;
    return this.http.put(person.href, person);//this.http.delete(href);
  }

}
