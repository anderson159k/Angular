import { SavingLocalService } from '../../services/saving-local.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Iten } from 'src/app/interfaces/iten-interface';
import { MekanicInItem } from 'src/app/interfaces/mecanic-in-iten';


@Component({
  selector: 'app-mecanic-list',
  templateUrl: './mecanic-list.component.html',
  styleUrls: ['./mecanic-list.component.scss']
})
export class MecanicListComponent implements OnInit, OnDestroy {

  constructor(private savingLocalService: SavingLocalService) { }

  @Input({ required: true }) iten: Iten;
  @Input({ required: true }) mecanicsChanged$: Observable<void>;

  dataSource2: MekanicInItem[] = [];
  displayedColumns: string[] = ['mecanico', 'tempo'];
  sub: Subscription;

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setDate(milissegundos: number): string {
    const minutos = Math.floor((milissegundos / 60000) % 60);
    const horas = Math.floor(milissegundos / 3600000);
    return `${horas},${minutos}h`;
  }


  ngOnInit(): void {
    this.setTable();
    this.sub = this.mecanicsChanged$.subscribe(() => this.setTable());
  }

  public setTable() {
    if (this.iten) {
      this.dataSource2 = Array.from(this.iten.mecanics.values());
    }
  }
}
