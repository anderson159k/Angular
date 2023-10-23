import { MekanicInItem } from "./mecanic-in-iten"

export interface MekanicWithIten {
    selectedMecanic: string,
    mecanics: Map<string, MekanicInItem>,
    blocked: boolean
    blockedStartButton: boolean
  }