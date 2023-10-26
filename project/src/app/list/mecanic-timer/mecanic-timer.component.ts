import { SavingLocalService } from '../../services/saving-local.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Iten } from 'src/app/interfaces/iten-interface';

@Component({
  selector: 'app-mecanic-timer',
  templateUrl: './mecanic-timer.component.html',
  styleUrls: ['./mecanic-timer.component.scss']
})

export class MecanicTimerComponent implements OnInit, OnDestroy {
  constructor(private savingLocalService: SavingLocalService) { }

  tick = interval(1000);
  sub: Subscription;
  display = {
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  @Input({ required: true }) iten: Iten;
  @Output() mecanicsChanged = new EventEmitter<void>()


  ngOnInit(): void {
    this.defineInitialTimer();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  calTime(): void {
    if (this.iten) {

      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (!mecanico || !this.iten.running) {
        return;
      }
      if (mecanico.lastPlayTime) {
        const elapsedTime = Date.now() - mecanico.lastPlayTime;
        const totalTime = elapsedTime + mecanico.total;
        this.setDisplay(totalTime);
      } else {
        const elapsedTime = Date.now();
        const totalTime = elapsedTime + mecanico.total;
        this.setDisplay(totalTime);
      }
    }
  }

  defineInitialTimer(): void {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico) {
        this.setDisplay(mecanico.total);
        if (this.iten.running) {
          this.sub = this.tick.subscribe(() => this.calTime());
        }
      }
    }
  }

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
        this.iten.running = true;
        mecanico.lastPlayTime = Date.now();
        this.defineInitialTimer();
        this.sub = this.tick.subscribe(() => this.calTime());
        if (typeof this.iten.blocked !== 'undefined') {
          this.iten.blocked = true;
        }
        this.savingLocalService.updateOrPush(this.iten);
      }
    }
  }

  resetDisplay(): void {
    this.display.hours = '00';
    this.display.minutes = '00';
    this.display.seconds = '00';
  }

  pause(): void {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico && this.iten.running) {
        this.sub.unsubscribe();
        if (mecanico.lastPlayTime) {
          const elapsedTime = Date.now() - mecanico.lastPlayTime;
          mecanico.total += elapsedTime;
        }
        this.iten.running = false;
        mecanico.lastPlayTime = undefined;
        this.mecanicsChanged.emit();
        this.savingLocalService.updateOrPush(this.iten);
      }
    }
  }

  reset(): void {
    if (this.iten) {
      this.iten.blocked = false;
      this.iten.running = false;
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico) {
        if (this.iten.running) {
          this.pause();
        }
        this.savingLocalService.updateOrPush(this.iten);
        this.resetDisplay();
      }


    }
  }
}
