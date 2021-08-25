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

  nodo = {
    temperatura : 0,
    humedad: 0,
    humedadDelSuelo: 0,
    luz: 0
  }
  @ViewChild('barChart') barChart;
  @ViewChild('temperaturaLineChart') temperaturaLineChart;

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
  appendData(){
    setTimeout(() => {
      const label = this.getTimeString();
      this.bars.data.labels.push(label);
      this.temperatureLine.data.labels.push(label);

      const data = Math.random()*30;

      this.bars.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
      });
      this.temperatureLine.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });

      this.bars.update();
      this.temperatureLine.update();
      this.appendData();
    }, 3000);
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
    this.realtime.getLevelData(/*"LEVEL1"*/).subscribe((data:any) => {
      this.nodo.humedad = data.LEVEL1.Humedad;
      this.nodo.humedadDelSuelo = data.LEVEL1.HumedadDelSuelo;
      this.nodo.luz = data.LEVEL1.Luz;
      this.nodo.temperatura = data.LEVEL1.Temperatura;
      console.log(data);
    })
  }


}
