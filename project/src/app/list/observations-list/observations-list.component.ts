import { Component, HostListener, ElementRef, OnInit, Input } from '@angular/core';
import { Iten } from 'src/app/interfaces/iten-interface';
import { SavingLocalService } from 'src/app/services/saving-local.service';

@Component({
  selector: 'app-observations-list',
  templateUrl: './observations-list.component.html',
  styleUrls: ['./observations-list.component.scss'],
})
export class ObservationsListComponent implements OnInit {
  @Input({ required: true }) iten: Iten;

  inputValue =  "";

  constructor(
    private el: ElementRef,
    private savingLocalService: SavingLocalService
  ) { }

  ngOnInit(): void {
    const storedObservations = localStorage.getItem('observations');
    if (storedObservations) {
      this.iten.observations = storedObservations;
    }
    const storedValue = localStorage.getItem('inputValue');
    if (storedValue) {
      this.inputValue = storedValue;
    }

  }

  @HostListener('focusout', ['$event'])

  onBlur(): void {
    this.savingLocalService.updateOrPush(this.iten);
  }
}
