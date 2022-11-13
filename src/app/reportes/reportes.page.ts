import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import xlsx from "json-as-xlsx"
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  endpoint = '/report'
  data: any[];
  item: any = {};
  constructor(private api: ApiService) { }

  ngOnInit() {
    const fecha = new Date();
    const mes = (fecha.getMonth() + 1).toString().length === 1 ? `0${fecha.getMonth() + 1}` : `${fecha.getMonth() + 1}`;
    const dia = (fecha.getDate()).toString().length === 1 ? `0${fecha.getDate()}` : `${fecha.getDate()}`;
    const anio = fecha.getFullYear();
    this.item.init_date = `${anio}-${mes}-${dia}`;
    this.item.end_date = `${anio}-${mes}-${dia}`;
  }
  index(){
    this.api.get(this.endpoint).toPromise().then((r: any[]) => {
      this.data = r;
      //console.log(r)
    });
  }
  getData(){
    this.endpoint = `/report/${this.item.init_date}/${this.item.end_date}`;
    console.log(this.item)
    this.index();
  }
  exportData(){
    let data = [
      {
        sheet: "Mediciones",
        columns: [
          {label: "Id", value: "id"},
          {label: "Ciclo", value: "cycle_id"},
          {label: "Temp°C", value: "temperature"},
          {label: "HR %", value: "relative_humidity"},
          {label: "HS %", value: "soil_moisture"},
          {label: "Fecha Hora", value: "date_time"}
        ],
        content: this.data,
      }
    ];
    let settings = {
      fileName: "Reporte", // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
      //RTL: true, // Display the columns from right-to-left (the default value is false)
    }

    xlsx(data, settings)
  }
}
