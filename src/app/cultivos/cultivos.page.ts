import { Cultivo } from './../models/cultivo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cultivos',
  templateUrl: './cultivos.page.html',
  styleUrls: ['./cultivos.page.scss'],
})
export class CultivosPage implements OnInit {
  cultivo: Cultivo = {
    codigo: '',
    nombre: '',
    kcIni: 0,
    kcMed: 0,
    kcFin: 0,
    tempMax: 0,
    tempMin: 0,
    humRelMax: 0,
    humRelMin: 0,
    humSueloMax: 0,
    humSueloMin: 0,
    altura: 0,
    observaciones: null
  };
  constructor() { }

  ngOnInit() {
  }
  logout(){
    return;
  }
}
