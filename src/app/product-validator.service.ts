import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductValidatorService {

  constructor() { }

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
}
