import { MekanicInItem } from "./mecanic-in-iten";

export interface Iten {
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
    mecanics: Map<string, MekanicInItem>;
    blocked: boolean;
    running: boolean;
    observations: string;
  }
  