import { MecanicTableService } from 'src/app/services/mecanic-table.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MekanicInItem } from '../interfaces/mecanic-in-iten';
import { MecanicTimerComponent } from './mecanic-timer/mecanic-timer.component';
import { Iten } from '../interfaces/iten-interface';
import { SavingLocalService } from '../services/saving-local.service';


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
    private mecanicTableService: MecanicTableService
  ) {}

  @ViewChild('timer') _timer: MecanicTimerComponent;

    dataSource: Iten [] = [];

  allMecanics = ['Mec1', 'Mec2', 'Mec3', 'Mec4', 'Mec5'];

  itenControler2 = new Map<string, {
    selectedMecanic: string,
    mecanics: Map<string, MekanicInItem>,
    blocked: boolean,
    blockedStartButton: boolean
  }>();

  onMecanicChanged(codItem: string, name: string) {
    const item = this.itenControler2.get(codItem);
    if (item) {
      item.selectedMecanic = name;
    }
    this._timer.defineInitialTimer();
  }

  initializeMapController() {

    for (const service of this.dataSource) {
      const mecanics = new Map();

      for (const mecanic of this.allMecanics) {
        mecanics.set(mecanic,
          {
            name: mecanic,
            running: false,
            finished: false,
            total: 0
          })
      }
      this.itenControler2.set(
        service.codigo, {
          selectedMecanic: "", 
          blocked: false,
          blockedStartButton: false,
          mecanics
      })
    }
  }

  ngOnInit(): void {
    this.dataSource = this.savingLocalService.getData();
    this.initializeMapController();
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



