import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cav-relatorios',
  templateUrl: './relatorios.component.html',
})
export class RelatoriosComponent implements OnInit {

  
  public pieData: any = [
    { category: 'Furtos', value: 0.42 },
    { category: 'Roubos', value: 0.58 }
  ]
  
  constructor() { }

  ngOnInit() {
  }

}
