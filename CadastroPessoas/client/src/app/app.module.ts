import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule,MatCardModule, MatInputModule, MatListModule, MatToolbarModule,MatFormFieldModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonListComponent, DialogRemovePeople } from './person-list/person-list.component';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {PersonEditComponent } from './person-edit/person-edit.component';
import {NgxMaskModule} from 'ngx-mask';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonEditComponent,
    DialogRemovePeople
  ],
  entryComponents: [
    DialogRemovePeople
  ],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatRippleModule,
    MatButtonModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule
  ],
  exports: [
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
