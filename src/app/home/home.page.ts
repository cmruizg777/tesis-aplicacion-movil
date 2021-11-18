import { Component, ElementRef, ViewChild } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { RealtimeService } from '../services/realtime/realtime.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('barChart') barChart;
  @ViewChild('temperaturaLineChart') temperaturaLineChart;
  nodo = {
    temperatura : 0,
    humedad: 0,
    humedadDelSuelo: 0,
    luz: 0
  };


  bars: any;
  temperatureLine: any;
  colorArray: any;

  constructor(
    private firestore: FirestoreService,
    private realtime: RealtimeService
  ) {}
  ionViewDidEnter() {
    setTimeout(() => {
      this.createBarChart();
      this.createTemperaturaLineChart();
      console.log(this.bars.data);
      this.appendData();
    }, 0);
  }
  appendData(counter = 0){
    setTimeout(() => {
      const label = this.getTimeString();
      this.bars.data.labels.push(label);
      const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
      this.bars.data.datasets[0].data.push(data);
      if (this.temperatureLine.data.datasets[0].data.length===10){
        this.temperatureLine.data.labels.shift();
        this.temperatureLine.data.datasets[0].data.shift();
      }
      this.temperatureLine.data.datasets[0].data.push(data);
      this.temperatureLine.data.labels.push(label);
      this.bars.update();
      this.temperatureLine.update();
      counter++;
      this.appendData(counter);
    },25000);
  }
  getTimeString(){
    const date = new Date();
    return `${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  }
  createBarChart(){

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Viewers in millions',
          data: [],
          //backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          //borderWidth: 1
        }]
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

  createTemperaturaLineChart(){

    this.temperatureLine = new Chart(this.temperaturaLineChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Temperatura',
          data: [],
          //backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(12, 25, 129)',// array should have same number of elements as number of dataset
          //borderWidth: 1
        }]
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
    this.getData();
  }
  async getData(){
    /*
    this.realtime.getLevelData().subscribe((data:any) => {
      this.nodo.humedad = data.LEVEL1.Humedad;
      this.nodo.humedadDelSuelo = data.LEVEL1.HumedadDelSuelo;
      this.nodo.luz = data.LEVEL1.Luz;
      this.nodo.temperatura = data.LEVEL1.Temperatura;
      console.log(data);
    });
    */
  }
}
