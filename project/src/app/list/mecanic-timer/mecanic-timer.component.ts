import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MekanicInItem } from 'src/app/interfaces/mecanic-in-iten';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-mecanic-timer',
  templateUrl: './mecanic-timer.component.html',
  styleUrls: ['./mecanic-timer.component.scss']
})

export class MecanicTimerComponent implements OnInit , OnDestroy {

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
  };

  ngOnInit(): void {

    

    this.defineInitialTimer()

      // if (this.iten) {
      //   const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      //   this.sub = this.tick.subscribe(x => {
      //     const secs = Date.now() - this.startTime;
      //     this.timer = {
      //       hours: "",
      //       minutes: "",
      //       seconds: `${secs}`.padStart(2, '0')
      //     }
      //   });
      // }

    
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
  const elapsedTime = Date.now() - this.startTime;
  this.setDisplay(elapsedTime + mecanico.total)
  console.log(mecanico);
 }}


  defineInitialTimer() {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico && typeof mecanico.lastPlayTime === 'number' && typeof mecanico.total === 'number') {
        this.startTime = mecanico.lastPlayTime;
        this.setDisplay(mecanico.total);
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
        mecanico.running = true;
        this.defineInitialTimer();
          this.sub = this.tick.subscribe(x => this.calTime());
        if (typeof this.iten.blocked !== 'undefined') {
          this.iten.blocked = true;
          
        }
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
      }
    }
  }
  
  reset():void {
    if (this.iten) {
      const mecanico = this.iten.mecanics.get(this.iten.selectedMecanic);
      if (mecanico) {
        this.sub.unsubscribe();
        const elapsedTime = Date.now() - this.startTime;
        mecanico.total += elapsedTime;
        mecanico.running = false;
        mecanico.finished = false;
        mecanico.lastPlayTime = undefined;
        this.display.hours = "00";
        this.display.minutes = "00";
        this.display.seconds = "00";
        if (typeof this.iten.blocked !== 'undefined') {
          this.iten.blocked = false;
        }
      }
    }
  }
}

