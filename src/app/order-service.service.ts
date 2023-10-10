import { Injectable } from '@angular/core';
import { IOrder } from './Models/Order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }
  url:string = 'https://localhost:7258/api/orders'
  addOrder(order:IOrder){
    return this.httpClient.post<IOrder>(this.url,order);
  }
}
