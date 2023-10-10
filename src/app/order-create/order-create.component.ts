import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../order-service.service';
import { IOrder } from '../Models/Order';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent {

  orderCreateForm = this.fb.group({
    date:'',
    description:'',
    customerId:0, 
    orderItems: this.fb.array([this.buildOrderItem()])
   
  });

  constructor(private fb:FormBuilder,private orderService:OrderService){

  }

  get orderItems():FormArray{
    return <FormArray>this.orderCreateForm.get('orderItems');
  }

  ngOninit(){
    this.orderCreateForm = this.fb.group({
      date:'',
      description:'',
      customerId:0, 
      orderItems: this.fb.array([this.buildOrderItem()])
     
    });

  }


  save()
  {
    this.orderService.addOrder(this.orderCreateForm.value as IOrder).subscribe(orderResult=>{
       console.log("Order Created Successfully!");
    });
  }

  buildOrderItem(){
    return this.fb.group({
      productId:'',
      qty:1,
      unitPrice:1
    });
  }

  addOrderItem(){
      this.orderItems.push(this.buildOrderItem());
  }

}
