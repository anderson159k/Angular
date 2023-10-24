import { Iten } from "./iten-interface"
import { MekanicInItem } from "./mecanic-in-iten"

export interface ItenWithMecanic {
    selectedMecanic: Map<string, MekanicInItem>,
    iten: Map<string, Iten>,
    blocked: boolean
    blockedStartButton: boolean
}