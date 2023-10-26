import { MecanicService } from './../services/mecanic.service';
import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Iten } from '../interfaces/iten-interface';
import { SavingLocalService } from '../services/saving-local.service';
import { Mecanic } from '../interfaces/mecanic';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {

  constructor (
    private savingLocalService: SavingLocalService,
    private mecanicService: MecanicService,
  ) {}

    dataSource: Iten [] = [];

  allMecanics: Mecanic [] = [];  

  // initializeMapController() {

  //   for (const service of this.dataSource) {
  //     const mecanics = new Map();

  //     for (const mecanic of this.allMecanics) {
  //       service.mecanics.set(mecanic.id,
  //         {
  //           mecanincId: mecanic.name,
  //           finished: false,
  //           total: 0
  //         })
  //     }
      
  //   }
  // }

  getMecanics(): void {
    this.allMecanics = this.mecanicService.getData();
  }

  ngOnInit(): void {
    this.getMecanics();
    this.dataSource = this.savingLocalService.getData();
  }

 
  columnsToDisplay = [
    'Estado',
    'Sequencia',
    'codigo',
    'quantidade',
    'Descrição',
    'valorun',
    'descontopecas',
    'descontoad',
    'valorlq',
    'mechanic'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Iten | null;


  
}



