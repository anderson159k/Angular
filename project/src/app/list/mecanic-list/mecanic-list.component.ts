import { SavingLocalService } from '../../services/saving-local.service';
import { Component, OnInit, Input } from '@angular/core';
import { MecanicTime } from 'src/app/interfaces/mecanic-time';
import { MecanicTableService } from 'src/app/services/mecanic-table.service';


@Component({
  selector: 'app-mecanic-list',
  templateUrl: './mecanic-list.component.html',
  styleUrls: ['./mecanic-list.component.scss']
})
export class MecanicListComponent implements OnInit{

  constructor(private savingLocalService: SavingLocalService, private mecanicTableService: MecanicTableService) {}

  @Input() iten: {
    selectedMecanic: string,
    mecanics: Map<string, MecanicTime>,
  };

  dataSource2: MecanicTime[] = [];
  displayedColumns: string[] = ['id', 'mecanico','tempo'];

  ngOnInit(): void {
    this.setTable();
    this.dataSource2 = this.mecanicTableService.getMecanicData();
  }

  public setTable() {
    if(this.iten){
      this.dataSource2 = Array.from(this.iten.mecanics.values());
    }
  }

  // adicionarItemNaTabela(tempo: string) {
  //   this.mecanicTableService.addMecanicData(this.iten.selectedMecanic, tempo);
  // }
}
