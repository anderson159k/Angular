import { Injectable } from '@angular/core';
import { Iten } from '../interfaces/iten-interface';
import { MekanicInItem } from '../interfaces/mecanic-in-iten';

interface LocalIten {
  estado: string;
    Sequencia: number;
    codigo: string;
    Descrição: string;
    quantidade: number;
    valorun: number;
    descontopecas: number;
    descontoad: number;
    valorlq: number;
    selectedMecanic: string;
    mecanics: Array<MekanicInItem>;
    blocked: boolean;
    running: boolean;
    observations: string;
}

@Injectable({
  providedIn: 'root'
})
export class SavingLocalService {
  private key = "services";

  public saveData(itens: Iten[]): void {
    const clones: LocalIten[] = []
    for (const iten of itens) {
      const clone: LocalIten = { ...iten, mecanics: Array.from(iten.mecanics.values())}
      clones.push(clone);
    }
    
    localStorage.setItem(this.key, JSON.stringify(clones));
  }

  public getData(): Iten[] {
    const serveStr = localStorage.getItem(this.key);
    if (serveStr) {
      const services = JSON.parse(serveStr);
      for (const iten of services) {
        const map = new Map<string, MekanicInItem>();
        if (iten.mecanics) {
          for (const mecanic of iten.mecanics) {
            map.set(mecanic.mecanincId, mecanic)
          }
        }
        iten.mecanics = map;
      }
      return services;
    }
    return [];
  }

  public getByCode(codIten: string): Iten | undefined {
    const allItens = this.getData();
    return allItens.find(iten => iten.codigo == codIten)
  }

  public updateOrPush(iten: Iten) {
    const allItens = this.getData();
    const index = allItens.findIndex((existingIten) => existingIten.codigo === iten.codigo);

    if (index !== -1) {
      allItens[index] = iten;
    } else {
      allItens.push(iten);
    }
    this.saveData(allItens);
  }
}


