import { Injectable } from '@angular/core';
import { MecanicTime } from 'src/app/interfaces/mecanic-time';

@Injectable({
  providedIn: 'root'
})
export class MecanicTableService {

  private data: MecanicTime[] = [];

  getMecanicData(): MecanicTime[] {
    return this.data;
  }

  addMecanicData(selectedMecanic: string, tempo: string) {
    const newMecanic: MecanicTime = {
      id: tempo,
      mecanico: selectedMecanic,
      tempo: tempo
    };
    this.data.push(newMecanic);
  }
}
