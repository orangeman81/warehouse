import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wh-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");
    document.body.appendChild(overlay);
  }

  ngOnDestroy() {
    let overlay = document.querySelector('#overlay');
    document.body.removeChild(overlay);
  }

}
