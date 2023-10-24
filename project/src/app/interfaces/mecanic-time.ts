import { Iten } from "./iten-interface";
import { MekanicInItem } from "./mecanic-in-iten";

export interface MecanicTime {
    id: Map<string, Iten>;
    mecanico: string;
    tempo: string;
  }