import { Injectable } from '@angular/core';
import { Iten } from '../interfaces/iten-interface';
import { MekanicInItem } from '../interfaces/mecanic-in-iten';

@Injectable({
  providedIn: 'root'
})
export class ItenTableService {
  private key = "itens-table";
  constructor() { }

  public saveData(itens: MekanicInItem []) : void {
    localStorage.setItem(this.key, JSON.stringify(itens));
  }

  public getData() : Iten [] {
    const serveStr = localStorage.getItem(this.key);
    if (serveStr) {
      return JSON.parse(serveStr);
    }
    return [];
  }

  public getByCode(codIten: string) : Iten | undefined {
    const allItens = this.getData();
    return allItens.find(iten => iten.codigo == codIten)
  }

  // public updateOrPush(iten: MekanicInItem) {
  //   const allItens = this.getData();
  //   const index = allItens.findIndex((existingIten) => existingIten.codigo === iten.codigo);
  
  //   if (index !== -1) {
  //     allItens[index] = iten;
  //   } else {
  //     allItens.push(iten);
  //   }
  //   this.saveData(allItens);
  // }  
}