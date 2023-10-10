import { Injectable } from '@angular/core';
import { Customer } from './Models/Customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    constructor(private httpClient:HttpClient) { }

  getCustomers() : Observable<Customer[]>{
  
      let url = "https://localhost:7258/api/customers";

      return this.httpClient.get<Customer[]>(url);

      
  }
}
