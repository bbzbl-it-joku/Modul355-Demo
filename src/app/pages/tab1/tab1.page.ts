import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonIcon, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  batteryFullOutline,
  batteryHalfOutline,
  batteryDeadOutline,
  wifiOutline,
  cellularOutline,
  cloudOfflineOutline, reloadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonItem,
    IonLabel,
    IonIcon
  ]
})
export class Tab1Page implements OnInit  {
  // Battery status
  batteryLevel: number = 0;
  isCharging: boolean = false;
  batteryIcon: string = 'battery-dead-outline';
  batteryColor: string = 'danger';

  // Network status
  isConnected: boolean = false;
  connectionType: string = 'none';
  connectionIcon: string = 'cloud-offline-outline';

  constructor() {
    // Register icons
    addIcons({
      'battery-full-outline': batteryFullOutline,
      'battery-half-outline': batteryHalfOutline,
      'battery-dead-outline': batteryDeadOutline,
      'wifi-outline': wifiOutline,
      'cellular-outline': cellularOutline,
      'cloud-offline-outline': cloudOfflineOutline,
      'reload-outline': reloadOutline
    });
  }

  async ngOnInit() {
    // Initial checks
    await this.checkBatteryStatus();
    await this.checkNetworkStatus();

    // Set up listeners
    this.setupNetworkListener();
    this.startBatteryMonitoring();
  }

  async checkBatteryStatus() {
    try {
      const info = await Device.getBatteryInfo();
      this.batteryLevel = Math.round((info.batteryLevel || 0) * 100);
      this.isCharging = info.isCharging || false;
      this.updateBatteryIcon();
    } catch (error) {
      console.error('Battery info error:', error);
    }
  }

  async checkNetworkStatus() {
    try {
      const status = await Network.getStatus();
      this.isConnected = status.connected;
      this.connectionType = status.connectionType;
      this.updateNetworkIcon();
    } catch (error) {
      console.error('Network status error:', error);
    }
  }

  setupNetworkListener() {
    Network.addListener('networkStatusChange', (status) => {
      this.isConnected = status.connected;
      this.connectionType = status.connectionType;
      this.updateNetworkIcon();
    });
  }

  startBatteryMonitoring() {
    // Check battery status every 10 seconds as fallback
    setInterval(() => {
      this.checkBatteryStatus();
    }, 10000);
  }

  private updateBatteryIcon() {
    if (this.batteryLevel > 70) {
      this.batteryIcon = 'battery-full-outline';
      this.batteryColor = 'success';
    } else if (this.batteryLevel > 30) {
      this.batteryIcon = 'battery-half-outline';
      this.batteryColor = 'warning';
    } else {
      this.batteryIcon = 'battery-dead-outline';
      this.batteryColor = 'danger';
    }
  }

  private updateNetworkIcon() {
    if (!this.isConnected) {
      this.connectionIcon = 'cloud-offline-outline';
    } else {
      this.connectionIcon = this.connectionType === 'wifi' ? 'wifi-outline' : 'cellular-outline';
    }
  }
}
