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

  @ViewChild('Chart') barChart;
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
  bars: any;
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
  appendData(newData, counter = 0){
    /*
    setTimeout(() => {
      if (this.bars.data.datasets[0].data.length===10){
        this.bars.data.labels.shift();
        this.bars.data.datasets[0].data.shift();
      }
      const label = this.getTimeString();
      this.bars.data.labels.push(label);
      const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
      this.bars.data.datasets[0].data.push(data);
      this.bars.update();
      counter++;
      this.appendData(counter);
    },250);
    */
    const label = this.getTimeString();
    this.bars.data.labels.push(label);
    //const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
    const data = newData;
    this.currentValue1 = data.nivel1;
   switch(this.tab){
    case 'humedads':
      if (this.history.humedads.nivel1.length===10){
        this.history.humedads.labels.shift();
        this.history.humedads.nivel1.shift();
      }
      this.history.humedads.nivel1.push(data.nivel1);
      this.history.humedads.labels.push(label);
      this.bars.data.labels = this.history.humedads.labels.slice();
      this.bars.data.datasets[0].data = this.history.humedads.nivel1.slice();
      break;
    case 'humedadr':
      //console.log(data)
      if (this.history.humedadr.nivel1.length===10){
        this.history.humedadr.labels.shift();
        this.history.humedadr.nivel1.shift();
      }
      this.history.humedadr.nivel1.push(data.nivel1);
      this.history.humedadr.labels.push(label);
      this.bars.data.labels = this.history.humedadr.labels.slice();
      this.bars.data.datasets[0].data = this.history.humedadr.nivel1.slice();
      break;
    case 'temperatura':
      if (this.history.temperatura.nivel1.length===10){
        this.history.temperatura.labels.shift();
        this.history.temperatura.nivel1.shift();
      }
      this.history.temperatura.nivel1.push(data.nivel1);
      this.history.temperatura.labels.push(label);
      this.bars.data.labels = this.history.temperatura.labels.slice();
      this.bars.data.datasets[0].data = this.history.temperatura.nivel1.slice();
      break;
   }
    this.bars.data.datasets[0].label = 'Valor actual: '+this.currentValue1;
    this.bars.update();
  }
  getTimeString(){
    const date = new Date();
    return `${date.getHours()}: ${date.getMinutes()}`;
  }
  createBarChart(){

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Vallor actual: '+this.currentValue1,

            data: this.history.luminosidad.nivel1,
            //backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(51, 59, 255)',// array should have same number of elements as number of dataset
            //borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  ngOnInit(){
    //this.getData();
    //this.appendData();
  }
  async getData(){
    this.firebaseSubscription = this.realtime.getLevelData('monitoreo/' + this.tab).subscribe((data: any) => {
      console.log(data, this.tab);
      this.appendData(data);
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
