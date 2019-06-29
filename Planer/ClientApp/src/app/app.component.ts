import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { LinkChangesService } from './link-changes.service';
import { EncrDecrService } from './encr-decr/encr-decr-service.service'; 
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Planer';
  loggedIn = true;
  isHamburgerClicked = false;
  timer;
  public changesExist;
  @ViewChild('menu') sidenav: any;

  constructor( private elRef: ElementRef, private linkChanges : LinkChangesService, private EncrDecr: EncrDecrService) {
    this.changesExist = false;
  }

  ngOnInit() {
    var seconds = 15;
    if (sessionStorage.getItem("timer") !== null) {
      seconds = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('timer')));
    }

    this.timer = interval(seconds*1000)
                .subscribe(data => {
                  if (sessionStorage.getItem("id") !== null) {
                  

                    var loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
                    console.log("user: " + loggedUserId);

                    this.linkChanges.checkIfChangesExist(loggedUserId).subscribe(result => {
                      this.changesExist = result["changesExist"];
                      console.log("checked changes");
                      console.log(result["changesExist"]);
                    }, error => console.error(error));   
                    
                    console.log("changes: " + this.changesExist);
                  }
                });
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
