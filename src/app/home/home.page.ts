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
  
  bars: any;
  colorArray: any;

  constructor(
    private firestore: FirestoreService,
    private realtime: RealtimeService
  ) {}
  ionViewDidEnter() {
    setTimeout(() => {
      this.createBarChart();  
    }, 0);
    
  }
  createBarChart(){
   
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
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
    this.getData()

    
  }
  async getData(){
    this.realtime.getLevelData("LEVEL1").subscribe((data:any) => {
      this.nodo.humedad = data.Humedad;
      this.nodo.humedadDelSuelo = data.HumedadDelSuelo;
      this.nodo.luz = data.Luz;
      this.nodo.temperatura = data.Temperatura;
    })
  }

  
}
