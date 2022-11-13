import { ApiService } from './../services/api.service';
import { Cultivo } from './../models/cultivo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cultivos',
  templateUrl: './cultivos.page.html',
  styleUrls: ['./cultivos.page.scss'],
})
export class CultivosPage implements OnInit {
  endpoint = '/crop';
  data: any[];
  edit = false;
  item: any = {};
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.index();
  }
  index(){
    this.api.get(this.endpoint).toPromise().then((r: any[]) => {
      this.data = r;
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

}
