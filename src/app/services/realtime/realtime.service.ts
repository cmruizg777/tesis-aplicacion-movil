import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(
    private db: AngularFireDatabase 
  ) { }
  
  getLevelData(level: string){
    
    return this.db.list("Nodos/"+level).snapshotChanges()
    .pipe(map((actions)=>{
      let obj = {};
      actions.map(
        (data:any)=>{
          const key = data.key;
          obj[key]= data.payload.val();
          return;
        })
      return obj;
      }))
  }
}
