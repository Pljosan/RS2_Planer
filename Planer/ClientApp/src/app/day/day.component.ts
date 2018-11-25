import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() dayNo: number;
  @Input() taskData;

  constructor() { }

  ngOnInit() {
  }

  editRequest() {
    console.log('edit request');
  }

}
