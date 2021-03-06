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
  MatProgressSpinnerModule,
  MatSliderModule,
  MatGridListModule,
  MatTableModule
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
    MatProgressSpinnerModule,
    MatSliderModule,
    MatGridListModule,
    MatTableModule,
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
    MatProgressSpinnerModule,
    MatSliderModule,
    MatGridListModule,
    MatTableModule,
  ],
  declarations: []
})
export class AppMaterialModule { }
