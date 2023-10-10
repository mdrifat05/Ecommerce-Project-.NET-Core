import { Component, EventEmitter, Output, Input } from '@angular/core';
import { IProduct } from '../../Models/Product';
import { ProductService } from '../../product.service';
import { AbstractControl, FormBuilder, FormControl, FormControlDirective, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

@Input() minValue:number = 1; 
@Input() maxValue:number = 10;

@Output() onAdded:EventEmitter<IProduct> = new EventEmitter<IProduct>();

ngOnInit(){
  console.log("On Init of Input");
  console.log("Min Value" + this.minValue); 
  console.log("Max Value" + this.maxValue);
}


ngOnChanges(){
   console.log("On Changes of Input");
   console.log("Min Value" + this.minValue); 
   console.log("Max Value" + this.maxValue);
  this.productForm.controls.rating.clearValidators();
  this.productForm.controls.rating.addValidators(Validators.required);
  this.productForm.controls.rating.addValidators(this.ratingMatch(this.minValue,this.maxValue));
   this.productForm.controls.rating.updateValueAndValidity();

}

  discount: number = 0; 
  constructor(private productService:ProductService, private fb:FormBuilder){
        this.productForm.valueChanges.subscribe(value=>{
          
          console.log("Product Form Value while value change: "+ value);
        })

        this.productForm.get('name')?.valueChanges.subscribe(value=>{
          console.log("Name changes: "+value);

          this.productForm.get('description')?.setValue(value);

          

        })

        this.productForm.get('salesPrice')?.valueChanges.subscribe(value=>{
          console.log("Name changes: "+value);

          this.productForm.get('name')?.markAsTouched();

          this.calculateDiscount(value as number);

        })
  }

  productForm = this.fb.group({
    id : 0,
     name : ['',Validators.required],
     salesPrice:0,
     description:'',
     rating:['', [this.ratingMatch(this.minValue,this.maxValue),Validators.required]]
  });

  message:string='';

  // name: string = ''; 
  // description: string = '';
  // salesPrice: number = 0;
  // categoryId: number |null  = null;

  // ratingMatch(control:AbstractControl):{[key:string]:boolean} | null {
  //   console.log("Rating Match is called. ");
  //   console.log(control.value);
  //    if(control.value <1 || control.value>5){
  //       return {'match':true};
  //    }

  //    return null; 
  // }

  ratingMatch(minValue:number, maxValue:number):ValidatorFn {
    return (control:AbstractControl):{[key:string]:boolean} | null => {
      console.log("Rating Match is called. ");
      console.log(control.value);
      console.log("Min Value "+minValue)
       if(control.value <minValue || control.value>maxValue){
          return {'match':true};
       }
  
       return null; 
    }
  }
  
  

save(){
 
  console.log(this.productForm.value);
  // let newProduct: IProduct ={
  //     id:0,
  //    name:this.productForm.get('name')?.value?.toString(),
  //    description:this.productForm.get('description')?.value.toString(),
  //    salesPrice:+this.productForm.get('salesPrice')?.value.toString()
  // };

  let newProduct = this.productForm.value as IProduct;

  this.productService.addProduct(newProduct).subscribe(p=>{

        this.onAdded.emit(newProduct);
        this.message = "Saved Successfully!";
  });

 
}

calculateDiscount(salesPrice:number):void{
  this.discount = salesPrice - salesPrice*.5;
}
    
}
