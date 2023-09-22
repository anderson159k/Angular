import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

const ELEMENT_DATA: TableElement[] = [
  { estado: '', Sequencia: 1, codigo: 	"1", Descrição: 'teste', quantidade: 1000, valorun: 200, descontopecas: 145, descontoad: 0, valorlq: 200},
  { estado: '', Sequencia: 2, codigo: "2", Descrição: '4.0026', quantidade: 1, valorun: 1, descontopecas: 1, descontoad: 1, valorlq: 1},
  { estado: '', Sequencia: 3, codigo: "3", Descrição: '6.941', quantidade: 1, valorun: 1, descontopecas: 1, descontoad: 1, valorlq: 1},
  { estado: '', Sequencia: 4, codigo: "4", Descrição: '9.0122', quantidade: 1, valorun: 1, descontopecas: 1, descontoad: 1, valorlq: 1},
];



interface MekanicInItem{
  name: string,
  running: boolean,
  lastPlayTime?: Date,
  finished: boolean,
  total: number
}


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
  standalone: true,
  imports: [MatTableModule, NgFor, MatButtonModule, NgIf, MatIconModule, MatSelectModule, NgStyle],
})
export class ListComponent implements OnInit{

  allMecanics = ['Mec1', 'Mec2', 'Mec3', 'Mec4', 'Mec5'];

  itenControler2 = new Map<string, {
    selectedMecanic: string,
    mecanics: Array<MekanicInItem>,
    blocked: boolean
  }>(); 
  
  onMecanicChanged(codItem: string, name: string) {
    const item = this.itenControler2.get(codItem);
    if (item) {
      item.selectedMecanic = name;
    }
  }

  initializeMapController() {
    const mecanics = [];
    for (const mecanic of this.allMecanics) {
      mecanics.push(
        {name: mecanic,
        running: false,
        finished: false,
        total: 0
      })
    }
    for (const service of ELEMENT_DATA) {
      this.itenControler2.set(
        service.codigo , {selectedMecanic: "", blocked: false, 
        mecanics })
      }
  }

  ngOnInit(): void {
    this.initializeMapController();
  }



  // Recebe o codIten, procura mecanico (find), seta running para true, salva o lestPlayTime e bloqueia o mat-select
  start(codItem: string): void {

  const item = this.itenControler2.get(codItem);

  if (item) {
    const mecanicoSelecionado = item.selectedMecanic;   
    if (mecanicoSelecionado) {
      const mecanico = item.mecanics.find((m) => m.name === mecanicoSelecionado);
      if (mecanico) {
        mecanico.running = true;
        mecanico.lastPlayTime = new Date();
        item.blocked = true;
      }
    }
  }

  console.log("start ok");

}

  // Recebeo codIten, procura o mecanico (find), seta running para false, calcula o tempo onde a data atual - data de inicio (lastPlayTime) e soma no total.
  pause(codItem: string): void {

    const item = this.itenControler2.get(codItem);
    if (item) {
      const mecanicoSelecionado = item.selectedMecanic;
      if (mecanicoSelecionado) {
        const mecanico = item.mecanics.find((m) => m.name === mecanicoSelecionado);
        if (mecanico && mecanico.running) {
          mecanico.running = false;
          if (mecanico.lastPlayTime) {
            const currentTime = new Date();
            const elapsedTime = currentTime.getTime() - mecanico.lastPlayTime.getTime();
            mecanico.total += elapsedTime;
          }
          item.blocked = false;
        }
      }
    }
  }

  //chama o pause e desbloqueia o mat select,
  reset(codItem: string): void {
    this.pause(codItem);
    const item = this.itenControler2.get(codItem);
    if (item) {
      item.blocked = false;
    }
  }


  getTimer(codItem: string): string {
    const item = this.itenControler2.get(codItem);
    if (item) {
      const mecanicoSelecionado = item.selectedMecanic;
      if (mecanicoSelecionado) {
        const mecanico = item.mecanics.find((m) => m.name === mecanicoSelecionado);
        if (mecanico && mecanico.running) {
          if (mecanico.lastPlayTime) {
            const currentTime = new Date();
            const elapsedTime = currentTime.getTime() - mecanico.lastPlayTime.getTime();
            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
            return(formattedTime);
          }
        }
      }
    }
    console.log("timer");
    return "";
  }
  
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
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

