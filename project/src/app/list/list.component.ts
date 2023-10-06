import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MekanicInItem } from '../interfaces/mecanic-in-iten';
import { MecanicTimerComponent } from './mecanic-timer/mecanic-timer.component';



const ELEMENT_DATA: TableElement[] = [
  { estado: '', Sequencia: 1, codigo: "1", Descrição: 'teste', quantidade: 1000, valorun: 200, descontopecas: 145, descontoad: 0, valorlq: 200 },
  { estado: '', Sequencia: 2, codigo: "2", Descrição: '4.0026', quantidade: 1, valorun: 1, descontopecas: 1, descontoad: 1, valorlq: 1 },
  { estado: '', Sequencia: 3, codigo: "3", Descrição: '6.941', quantidade: 1, valorun: 1, descontopecas: 1, descontoad: 1, valorlq: 1 },
  { estado: '', Sequencia: 4, codigo: "4", Descrição: '9.0122', quantidade: 1, valorun: 1, descontopecas: 1, descontoad: 1, valorlq: 1 },
];


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

  /**
   * O Decorator @ViewChild possibilita que um elemento html ou componente aninhado
   * seja acessado na classe do componente.
   * 
   * Nesse caso, temos o componente MecanicTimerComponent, que é usado aqui no html de
   * ListComponent da seguinte forma:
   * 
   * <app-mecanic-timer #timer></<app-mecanic-timer>
   * 
   * então, para acessar alguma propriedade ou método público de #timer(do html)
   * utilizamos this._timer(script)
   * 
   * veja que na função `onMecanicChanged` utilizamos esse recurso da seguinte forma:
   * ```
   *  this._timer.defineInitialTimer();
   * ```
   */
  @ViewChild('timer') _timer: MecanicTimerComponent;

  allMecanics = ['Mec1', 'Mec2', 'Mec3', 'Mec4', 'Mec5'];

  itenControler2 = new Map<string, {
    selectedMecanic: string,
    mecanics: Map<string, MekanicInItem>,
    blocked: boolean
  }>();

  onMecanicChanged(codItem: string, name: string) {
    const item = this.itenControler2.get(codItem);
    if (item) {
      item.selectedMecanic = name;
    }
    this._timer.defineInitialTimer();
  }

  initializeMapController() {

    for (const service of ELEMENT_DATA) {
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
          selectedMecanic: "", blocked: false,
        mecanics
      })
    }
  }

  ngOnInit(): void {
    this.initializeMapController();
  }

  dataSource = ELEMENT_DATA;
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
  expandedElement: TableElement | null;


  
}

interface TableElement {
  estado: string;
  Sequencia: number;
  codigo: string;
  Descrição: string;
  quantidade: number;
  valorun: number;
  descontopecas: number;
  descontoad: number;
  valorlq: number;
}


