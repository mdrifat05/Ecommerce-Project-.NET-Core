import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductValidatorService } from '../../product-validator.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit,AfterViewInit {
 
  @Input() set id(productId:number){
    this.loadProductById(productId);
  }

  @Input() minValue:number = 1; 
  @Input() maxValue:number = 10;

  constructor(private productValidator:ProductValidatorService, private fb:FormBuilder, private route:ActivatedRoute, private productService:ProductService){
    

  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(){
    // this.route.paramMap.subscribe(params=>{
    //   let id:number = Number(params?.get('id')?.toString());

    //   this.loadProductById(id);

    // });
  }

  loadProductById(id:number){
    this.productService.getProductById(id).subscribe(product=>{
      this.productForm.patchValue(product);
    }); 
  }


  productForm = this.fb.group({
    id : 0,
     name : ['',Validators.required],
     salesPrice:0,
     description:'',
     rating:['', [this.productValidator.ratingMatch(this.minValue,this.maxValue),Validators.required]]
  });

  update(){

  }


}
