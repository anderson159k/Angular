import { Injectable } from '@angular/core';
import { Mecanic } from '../interfaces/mecanic';

@Injectable({
    providedIn: 'root'
  })
  
  export class MecanicService {
    private key = "mecanics";

    public getData() : Mecanic [] {
        const serveStr = localStorage.getItem(this.key);
        if (serveStr) {
          return JSON.parse(serveStr);
        }
        return [];
      }
  }