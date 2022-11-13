import { Cultivo } from './../models/cultivo';

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient ) { }
  /*
  getCategories(): Observable<Category[]>{
    const categoriesSubject = new Subject<Category[]>();
    this.get('category').subscribe((data: any) => {
      if(data.categories){
        const categories = [];
        data.categories.forEach(c => {
          const category = new Category(c.id_centro_costo, c.descripcion);
          categories.push(category);
        });
        categoriesSubject.next(categories);
      }
    });
    return categoriesSubject.asObservable();
  }

  getProducts(categoryId: number): Observable<Product[]>{
    const productsSubject = new Subject<Product[]>();
    this.get(`product/index/${categoryId}`).subscribe((data: any) => {
      if(data.products){
        const products = [];
        data.products.forEach(p => {
          const product = new Product(p.id_producto, p.producto, p.grupo, p.precio1);
          products.push(product);
        });
        productsSubject.next(products);
      }
    });
    return productsSubject.asObservable();
  }
  searchProducts(searchParam: string): Observable<Product[]>{
    const productsSubject = new Subject<Product[]>();
    this.post(`product/search`, {searchParam}).subscribe((data: any) => {
      if(data.products){
        const products = [];
        data.products.forEach(p => {
          console.log(p)
          const product = new Product(p.id_producto, p.producto, p.grupo, p.precio1, p.costo);
          products.push(product);
        });
        productsSubject.next(products);
      }
    });
    return productsSubject.asObservable();
  }
  searchProvider(searchParam: string): Observable<Provider[]>{
    const providerSubject = new Subject<Provider[]>();
    this.post(`provider/search`, {searchParam}).subscribe((data: any) => {
      if(data.providers){
        const providers = [];
        data.providers.forEach(p => {
          console.log(p)
          const provider = new Provider(p.id_proveedor, p.nombre, p.nombre_comercial, p.ruc);
          providers.push(provider);
        });
        providerSubject.next(providers);
      }
    });
    return providerSubject.asObservable();
  }

  getProduct(productId: number): Observable<Product>{
    const productsSubject = new Subject<Product>();
    this.get(`product/show/${productId}`).subscribe((data: any) => {
      if(data.product){
        const p = data.product;
        const product = new Product(p.id_producto, p.producto, p.grupo, p.precio1, p.stock);;
        productsSubject.next(product);
      }
    });
    return productsSubject.asObservable();
  }

  getImage(entity: string, id: number): Observable<any>{
    return this.get(`image/${id}/${entity}`);
  }
  findClient(documentNumber: string){
    const clientSubject = new Subject<Client>();
    this.get(`client/${documentNumber.trim()}`).subscribe((data: any) => {
      console.log(data)
      if(data.client){
        const c = data.client;
        const client = c;
        clientSubject.next(client);
      }else{
        clientSubject.next(null);
      }
    });
    return clientSubject.asObservable();
  }
  searchClient(searchParam: string): Observable<Client[]>{
    const customerSubject = new Subject<Client[]>();
    this.post(`client/search`, {searchParam}).subscribe((data: any) => {
      if(data.clients){
        const customers = [];
        data.clients.forEach(c => {
          const customer = new Client(c.cedula, c.nombre, c.apellido, c.id_cliente, c.direccion, c.email, c.telefono);
          customers.push(customer);
        });
        customerSubject.next(customers);
      }
    });
    return customerSubject.asObservable();
  }
  findVehicle(documentNumber: string){
    const vehicleSubject = new Subject<Vehicle>();
    this.get(`vehicle/${documentNumber.trim()}`).subscribe((data: any) => {
      if(data.vehicle){
        const v = data.vehicle;
        vehicleSubject.next(v);
      }else{
        vehicleSubject.next(null)
      }
    });
    return vehicleSubject.asObservable();
  }
  */
  get<Type>(endpoint: string, params: any = null):Observable<Type>{
    return this.http.get<Type>(this.getFinalUrl(endpoint));
  }
  post<Type>(endpoint: string, params: any = {}): Observable<Type>{
    return this.http.post<Type>(this.getFinalUrl(endpoint), params);
  }
  put<Type>(endpoint: string, params: any = {}): Observable<Type>{
    return this.http.put<Type>(this.getFinalUrl(endpoint), params);
  }
  delete<Type>(endpoint: string, params: any = {}): Observable<Type>{
    return this.http.delete<Type>(this.getFinalUrl(endpoint));
  }
  getFinalUrl(endpoint: string){
    return environment.baseUrl + endpoint;
  }
  /*CRUD CULTIVOS */
  obtenerCultivos(){
    let endpoint = '/cultivo';
    return this.get<Cultivo>(endpoint).toPromise();
  }
  guardarCultivo(cultivo){
    let endpoint = '/cultivo/cretae';
    return this.post<Cultivo>(endpoint, cultivo).toPromise();
  }
  editarCultivo(cultivo){
    let endpoint = '/cultivo/edit';
    return this.put<Cultivo>(endpoint, cultivo).toPromise();
  }
  borrarCultivo(cultivo){
    let endpoint = '/cultivo/delete/'+cultivo.id;
    return this.delete<Cultivo>(endpoint).toPromise();
  }

  /*CRUD CICLOS CULTIVOS */
  /*
  obtenerCultivos(){
    let endpoint = '/cultivo';
    return this.get<Cultivo>(endpoint).toPromise();
  }
  guardarCultivo(cultivo){
    let endpoint = '/cultivo/cretae';
    return this.post<Cultivo>(endpoint, cultivo).toPromise();
  }
  editarCultivo(cultivo){
    let endpoint = '/cultivo/edit';
    return this.put<Cultivo>(endpoint, cultivo).toPromise();
  }
  borrarCultivo(cultivo){
    let endpoint = '/cultivo/delete/'+cultivo.id;
    return this.delete<Cultivo>(endpoint).toPromise();
  }
  */
  /*CRUD INVERNADEROS */
  /*
  obtenerCultivos(){
    let endpoint = '/cultivo';
    return this.get<Cultivo>(endpoint).toPromise();
  }
  guardarCultivo(cultivo){
    let endpoint = '/cultivo/cretae';
    return this.post<Cultivo>(endpoint, cultivo).toPromise();
  }
  editarCultivo(cultivo){
    let endpoint = '/cultivo/edit';
    return this.put<Cultivo>(endpoint, cultivo).toPromise();
  }
  borrarCultivo(cultivo){
    let endpoint = '/cultivo/delete/'+cultivo.id;
    return this.delete<Cultivo>(endpoint).toPromise();
  }
  */

  //REPORTES

}
