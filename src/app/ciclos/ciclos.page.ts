import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.page.html',
  styleUrls: ['./ciclos.page.scss'],
})
export class CiclosPage implements OnInit {

  endpoint = '/cropcycle';
  data: any[];
  dataCrops: any[];
  dataGreenHouses: any[];
  edit = false;
  item: any = {};
  constructor(private api: ApiService) { }

  ngOnInit() {
    const fecha = new Date();
    const mes = (fecha.getMonth() + 1).toString().length === 1 ? `0${fecha.getMonth() + 1}` : `${fecha.getMonth() + 1}`;
    const dia = (fecha.getDate()).toString().length === 1 ? `0${fecha.getDate()}` : `${fecha.getDate()}`;
    const anio = fecha.getFullYear();
    this.item.init_date = `${anio}-${mes}-${dia}`;
    this.item.end_date = `${anio}-${mes}-${dia}`;
    this.index();
    this.indexCrops();
    this.indexGreenHouses();
  }
  index(){
    this.api.get(this.endpoint).toPromise().then((r: any[]) => {
      this.data = r;
    });
  }
  indexCrops(){
    this.api.get('/crop').toPromise().then((r: any[]) => {
      this.dataCrops = r;
    });
  }
  indexGreenHouses(){
    this.api.get('/greenhouse').toPromise().then((r: any[]) => {
      this.dataGreenHouses = r;
    });
  }
  create(){
    this.api.post(this.endpoint, this.item).toPromise().then((r: any[]) => {
      this.item = {};
      this.index();
    });
  }
  update(){
    this.api.put(this.endpoint+'/'+this.item.id, this.item).toPromise().then((r: any[]) => {
      this.item = {};
      this.edit = false;
      this.index();
    });
  }
  delete(id){
    this.api.delete(this.endpoint+'/'+id).toPromise().then((r: any[]) => {
      this.index();
    });
  }
  save(){
    if(this.edit){
      this.update();
    }else{
      this.create();
    }
  }
  crop(id){
    if(!this.dataCrops)return;
    return this.dataCrops.filter(d => d.id === id)[0].description;
  }
  greenhouse(id){
    if(!this.dataGreenHouses)return;
    return this.dataGreenHouses.filter(d => d.id === id)[0].description;
  }

}
