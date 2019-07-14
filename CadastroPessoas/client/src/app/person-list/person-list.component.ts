import { Component, OnInit ,ViewChild} from '@angular/core';
import { PersonService } from '../shared/person/person.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from '../providers/date.adapter';
import {MatDialog} from '@angular/material/dialog';

/*
  Criado por Clémerson Medeiros no dia 12/07/2019 
*/

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},{provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})

export class PersonListComponent implements OnInit {

  persons: Array<any>;
  displayedColumns: string[] = ['name', 'cpf', 'email', 'birthDate','actions'];
  today = new Date();
  dataSource = new MatTableDataSource<any>(); 

  filteredValues = {name :'', cpf : '', email : '', birthDate : ''};
  cpfFilter = new FormControl();
  nameFilter = new FormControl();
  emailFilter = new FormControl();
  birthDateFilter = new FormControl();

  constructor(private personService: PersonService,public dialog: MatDialog) { 

  }
  // Ordenador da tabela, aplicado no cabeçalho da coluna
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // Quebra por página da tabela
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    
    this.personService.getAll().subscribe(data => {

      // Converte util.Date do Java para Date do Angular 
      data.forEach(element => {
        element.birthDate = new Date(element.birthDate)  
      });
      this.persons = data;
      this.constructTable(data)
    });    

    // Preparação do FormControl para uso do filtro cpf
    this.cpfFilter.valueChanges.subscribe((cpfFilterValue) => {
      this.filteredValues['cpf'] = cpfFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    // Preparação do FormControl para uso do name
    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues['name'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    // Preparação do FormControl para uso do email
    this.emailFilter.valueChanges.subscribe((emailFilterValue) => {
      this.filteredValues['email'] = emailFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    // Preparação do FormControl para uso do filtro data de nascimento
    this.birthDateFilter.valueChanges.subscribe((birthDateFilterValue) => {
      this.filteredValues['birthDate'] = (birthDateFilterValue == null)? '':birthDateFilterValue.getDate()+'/'+birthDateFilterValue.getMonth()+'/'+birthDateFilterValue.getFullYear();
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  // Médodo de construção da <table>, utilizado também apos remoção de um registro.
  constructTable(data){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  // Construção do filtro personalizado para atender as colunas de forma individual
  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      let birthDate = '';
      if (data.birthDate != null){
        birthDate = data.birthDate.getDate()+'/'+data.birthDate.getMonth()+'/'+data.birthDate.getFullYear();
      }
      return data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 &&
        data.cpf.replace(/[^\w\s]/gi, '').trim().indexOf(searchString.cpf.replace(/[^\w\s]/gi, '')) !== -1 &&
        birthDate.indexOf(searchString.birthDate) !== -1 &&
        data.email.toString().trim().toLowerCase().indexOf(searchString.email.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }

  // Bloquear Data de Nascimento maior que atual
  blockDate = (d: Date): boolean => {
    return d <= this.today;
  }
  
  //  Remover pessoa
  remove(person) {
    const dialogRef = this.dialog.open(DialogRemovePeople); // Dialog de confirmação
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.personService.remove(person).subscribe(result => {

          // Remove apenas linha para não carregar a pagina novamente
          var index = 0;
          this.persons.forEach(element => {
            if (element.id == person.id){
              this.persons.splice(index,1);
              return;
            }
            index++;
          });
          this.constructTable(this.persons);
        }, error => console.error(error));
      }
    });
  }
}


@Component({
  selector: 'dialog-remove-people',
  templateUrl: 'dialog-remove-people.html',
})
// Export do Dialog de confirmação de remoção de pessoa
export class DialogRemovePeople {}