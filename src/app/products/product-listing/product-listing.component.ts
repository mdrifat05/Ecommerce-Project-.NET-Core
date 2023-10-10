import { Component } from '@angular/core';
import { Customer } from 'src/app/Models/Customer';
import { IProduct } from 'src/app/Models/Product';
import { CustomerService } from 'src/app/customer-service.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent {

  title: string = 'Product List'; 

  // imageSrc: string = 'https://angular.io/assets/images/logos/angular/angular.svg';

  products:IProduct[] = [];
  constructor(private productService:ProductService, private customerService:CustomerService){
    this.productService
              .getProducts()
              .subscribe(products=> this.products = products);
  }

  // changeTitle(){
  //   this.title = 'Product List Changed';
  // }

  NewProductAdded(product:IProduct){

    this.products.push(product);

  }




}
