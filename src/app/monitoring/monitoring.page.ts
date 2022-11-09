/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit, ViewChild } from '@angular/core';
import { RealtimeService } from '../services/realtime/realtime.service';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {

  @ViewChild('Chart1') barChart1;
  @ViewChild('Chart2') barChart2;
  @ViewChild('Chart3') barChart3;
  tab = 'temperatura';

  history = {
    temperatura : {
      nivel1: [],
      labels: []
    },
    humedadr: {
      nivel1: [],
      labels: []
    },
    humedads:  {
      nivel1: [],
      labels: []
    },
    luminosidad:  {
      nivel1: [],
      labels: []
    },
  };
  currentValue1 = 0;
  currentState1 = '';
  bars1: any;
  bars2: any;
  bars3: any;
  colorArray: any;
  firebaseSubscription: Subscription;
  constructor(
    private realtime: RealtimeService
  ) {}
  ionViewDidEnter() {
    setTimeout(() => {
      this.createBarChart();
      this.getData();
      this.getStatus();
      //this.appendData(null);
    }, 0);
  }
  appendData1(newData){
    const label = this.getTimeString();
    this.bars1.data.labels.push(label);
    //const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
    const data = newData;
    const currentValue1 = data.nivel1;
    if (this.history.temperatura.nivel1.length===10){
      this.history.temperatura.labels.shift();
      this.history.temperatura.nivel1.shift();
    }
    this.history.temperatura.nivel1.push(data.nivel1);
    this.history.temperatura.labels.push(label);
    this.bars1.data.labels = this.history.temperatura.labels.slice();
    this.bars1.data.datasets[0].data = this.history.temperatura.nivel1.slice();
    this.bars1.data.datasets[0].label = 'Valor actual: '+currentValue1;
    this.bars1.update();
  }
  appendData2(newData){
    const label = this.getTimeString();
    this.bars2.data.labels.push(label);
    //const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
    const data = newData;
    const currentValue1 = data.nivel1;
    if (this.history.humedadr.nivel1.length===10){
      this.history.humedadr.labels.shift();
      this.history.humedadr.nivel1.shift();
    }
    this.history.humedadr.nivel1.push(data.nivel1);
    this.history.humedadr.labels.push(label);
    this.bars2.data.labels = this.history.humedadr.labels.slice();
    this.bars2.data.datasets[0].data = this.history.humedadr.nivel1.slice();
    this.bars2.data.datasets[0].label = 'Valor actual: '+currentValue1;
    this.bars2.update();
  }
  appendData3(newData){
    const label = this.getTimeString();
    this.bars3.data.labels.push(label);
    //const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
    const data = newData;
    const currentValue1 = data.nivel1;
    if (this.history.humedads.nivel1.length===10){
      this.history.humedads.labels.shift();
      this.history.humedads.nivel1.shift();
    }
    this.history.humedads.nivel1.push(data.nivel1);
    this.history.humedads.labels.push(label);
    this.bars3.data.labels = this.history.humedads.labels.slice();
    this.bars3.data.datasets[0].data = this.history.humedads.nivel1.slice();
    this.bars3.data.datasets[0].label = 'Valor actual: '+currentValue1;
    this.bars3.update();
  }

  getTimeString(){
    const date = new Date();
    return `${date.getHours()}: ${date.getMinutes()}`;
  }
  createBarChart(){
    const settings = {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          { label: 'Vallor actual: ', data: [], borderColor: 'rgb(51, 59, 255)', }
        ]
      },
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
    };
    console.log(settings);
    const settings1 = JSON.parse(JSON.stringify(settings));
    const settings2 = JSON.parse(JSON.stringify(settings));
    const settings3 = JSON.parse(JSON.stringify(settings));

    settings1.data.datasets[0].data = this.history.temperatura.nivel1;
    settings2.data.datasets[0].data = this.history.humedadr.nivel1;
    settings3.data.datasets[0].data = this.history.humedads.nivel1;
    console.log(settings1);
    this.bars1 = new Chart(this.barChart1.nativeElement,settings1);
    this.bars2 = new Chart(this.barChart2.nativeElement,settings2);
    this.bars3 = new Chart(this.barChart3.nativeElement,settings3);
  }
  ngOnInit(){
    //this.getData();
    //this.appendData();
  }
  async getData(){
    this.firebaseSubscription = this.realtime.getLevelData('monitoreo/' ).subscribe((data: any) => {
      console.log(data, this.tab);
      this.appendData1(data.temperatura);
      this.appendData2(data.humedadr);
      this.appendData3(data.humedads);
    });
  }
  async getStatus(){
    this.realtime.getLevelData('monitoreo/estado').subscribe((data: any) => {
      console.log(data);
      this.currentState1 = data.nivel1;
    });
  }
  changeTab(tab: string){
    this.tab = tab;
    this.firebaseSubscription.unsubscribe();
    this.getData();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.firebaseSubscription.unsubscribe();
  }
  refresh(){
    this.getData();
  }
}
