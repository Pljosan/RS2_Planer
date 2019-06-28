import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Planer';
  loggedIn = true;
  isHamburgerClicked = false;
  @ViewChild('menu') sidenav: any;

  constructor( private elRef: ElementRef) {
  }

  onCloseSidenav(): void {
    if (this.elRef.nativeElement.querySelector('.container1') !== null && this.isHamburgerClicked) {
      this.elRef.nativeElement.querySelector('.container1').classList.toggle('change');
    }
    this.isHamburgerClicked = false;

  }

  myFunction(x): void {
    if (!this.isHamburgerClicked) {
      x.classList.toggle('change');
      this.isHamburgerClicked = true;
    }
  }

}
