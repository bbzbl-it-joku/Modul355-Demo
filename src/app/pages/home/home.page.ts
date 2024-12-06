import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonRange, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonToast, IonSelect, IonSelectOption, IonList, IonLabel, IonRange, IonItem, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  isToastOpen = false;
  input: string = "";
  int: number = 0;
  color: string = "";

  constructor() { }

  ngOnInit() {
  }

  setInput(event: Event) {
    const input = event as CustomEvent;
    this.input = input.detail.value || '';
  }

  setInt(event: Event) {
    const range = event as CustomEvent;
    this.int = range.detail.value || 0;
  }

  setColor(event: { detail: { value: string; }; }) {
    this.color = event.detail.value;
    this.setOpen(true);
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
