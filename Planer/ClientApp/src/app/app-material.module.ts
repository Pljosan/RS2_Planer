import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatSidenavModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class AppMaterialModule { }
