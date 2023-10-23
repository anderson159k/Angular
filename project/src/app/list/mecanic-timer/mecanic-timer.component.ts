import { SavingLocalService } from '../../services/saving-local.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MekanicInItem } from 'src/app/interfaces/mecanic-in-iten';
import { Subscription, interval } from 'rxjs';
import { Iten } from 'src/app/interfaces/iten-interface';


@Component({
  selector: 'app-mecanic-timer',
  templateUrl: './mecanic-timer.component.html',
  styleUrls: ['./mecanic-timer.component.scss']
})

export class MecanicTimerComponent implements OnInit, OnDestroy {

  constructor(
    private savingLocalService: SavingLocalService
  ) { }

  tick = interval(1000);
  sub: Subscription;
  startTime: number = 0;
  display = {
    hours: "00",
    minutes: "00",
    seconds: "00"
  }

  @Input() iten?: {
    selectedMecanic: string,
    mecanics: Map<string, MekanicInItem>,
    blocked: boolean
    blockedStartButton: boolean
  };

  ngOnInit(): void {
    this.defineInitialTimer()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  calTime(): void {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (!mecanico || !mecanico.running) {
        return;
      }
      /**
       * elapsedTime é o tempo decorrido(em milisegundos) que se passou desde a última
       * vez em que foi clicado no play para o mecânico selecionado
       */
      const elapsedTime = Date.now() - this.startTime;

      /**
       * totalTime é o tempo decorrido somado a outros intervalos que 
       * já haviam sido contabilizados anteriormente (quando já houve play/pause antes)
       */
      const totalTime = elapsedTime + mecanico.total;
      this.setDisplay(totalTime)
    }
  }

  /**
   * Em Typescript, modificadores de acesso não definidos são considerados como públicos por padrão.
   * Nesse caso deixamos explícito que esse método é público para evitar modificar para privado acidentalmente
   * 
   * Esse método é público porque está sendo chamado a partir de ListComponent quando o mecânico é alterado;
   */
  public defineInitialTimer() {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico) {
        if (mecanico.lastPlayTime?.valueOf()) {
          // se o mecânico possui `lastPlayTime`, utiliza esse valor nos cálculos
          this.startTime = mecanico.lastPlayTime.valueOf();
        } else {
          // senão, o `lastPlayTime` é agora
          // o código entra aqui na primeira vez que se aperta play em um mecânico
          this.startTime = Date.now();
        }
        this.setDisplay(mecanico.total);
      }
    }
  }

  /** 
   * Funcionando perfeitamente, recebe um valor total em milisegundos e 
   * atualiza o timer com horas:minutos:segundos
   */
  setDisplay(totalTime: number): void {
    const totalSeconds = Math.floor(totalTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    this.display = {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  }

  start(): void {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico) {
        mecanico.finished = true;
        mecanico.running = true;
        this.defineInitialTimer();
        this.sub = this.tick.subscribe(() => this.calTime());
        if (typeof this.iten.blocked !== 'undefined') {
          this.iten.blocked = true;
          this.iten.blockedStartButton = true;
        }
        
        // const itenArray: MekanicInItem[] = Array.from(this.iten.mecanics.values());
        // this.savingLocalService.saveData(itenArray);
      }
    }
  }

  pause(): void {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico && mecanico.running) {
        this.sub.unsubscribe();
        const elapsedTime = Date.now() - this.startTime;
        mecanico.total += elapsedTime;
        mecanico.running = false;
        mecanico.lastPlayTime = undefined;
        this.iten.blockedStartButton = false;
      }
    }
  }

  reset(): void {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico) {
        this.sub.unsubscribe();
        const elapsedTime = Date.now() - this.startTime;
        mecanico.total += elapsedTime;
        mecanico.running = false;
        mecanico.finished = false;
        mecanico.lastPlayTime = undefined;
        this.iten.blockedStartButton = false;
        this.display.hours = "00";
        this.display.minutes = "00";
        this.display.seconds = "00";

        
        if (typeof this.iten.blocked !== 'undefined') {
          this.iten.blocked = false;
        }
        console.log(mecanico.total);
      }
    }
  }
}

