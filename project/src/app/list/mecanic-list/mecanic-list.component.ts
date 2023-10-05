import { Component, OnInit, Input } from '@angular/core';
import { MecanicTime } from 'src/app/interfaces/mecanic-time';

const ELEMENT_DATA2: MecanicTime[] = [
  {mecanico: "Mec1", tempo: `1h22`},
  {mecanico: "Mec2", tempo: `3h30`},
  {mecanico: "Mec3", tempo: `5h02`}
];

@Component({
  selector: 'app-mecanic-list',
  templateUrl: './mecanic-list.component.html',
  styleUrls: ['./mecanic-list.component.scss']
})
export class MecanicListComponent implements OnInit{
  
  @Input() iten?: {
    selectedMecanic: string,
    mecanics: Map<string, MecanicTime>,
  };

  ngOnInit(): void {
    
  }
  displayedColumns: string[] = ['mecanico','tempo'];
  dataSource2 = ELEMENT_DATA2;
}

