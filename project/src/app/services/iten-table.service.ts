// import { Injectable } from '@angular/core';
// import { MekanicInItem } from '../interfaces/mecanic-in-iten';

// @Injectable({
//   providedIn: 'root'
// })
// export class ItenTableService {
//   private key = "itens-table";

//   public saveData(itens: MekanicInItem []) : void {
//     localStorage.setItem(this.key, JSON.stringify(itens));
//   }

//   public getData() : MekanicInItem [] {
//     const serveStr = localStorage.getItem(this.key);
//     if (serveStr) {
//       return JSON.parse(serveStr);
//     }
//     return [];
//   }

//   public updateOrPush(iten: MekanicInItem) {
//     const allItens = this.getData();
//     const index = allItens.findIndex((existingIten) => existingIten.mecanincId === iten.mecanincId);
  
//     if (index !== -1) {
//       allItens[index] = iten;
//     } else {
//       allItens.push(iten);
//     }
//     this.saveData(allItens);
//   }  
// }