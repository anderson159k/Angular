import { MekanicInItem } from "./mecanic-in-iten"

export interface MecanicWithIten {
    selectedMecanic: string,
    mecanics: Map<string, MekanicInItem>,
    blocked: boolean
    blockedStartButton: boolean
  }