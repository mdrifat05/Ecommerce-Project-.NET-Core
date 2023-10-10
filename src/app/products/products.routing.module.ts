import { NgModule } from "@angular/core";
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from "@angular/router";
import { ProductListingComponent } from "./product-listing/product-listing.component";
import { ProductCreateComponent } from "./product-create/product-create.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";

const routes:Routes = [
    {path:"products" , component:ProductListingComponent},
    {path:"product-create", component:ProductCreateComponent},
    {path:"product-edit/:id", component:ProductEditComponent},
]


@NgModule(
    {
        imports: [
            RouterModule.forChild(routes)
           ],
           exports: [RouterModule],
           providers:[
             provideRouter(routes,withComponentInputBinding())
           ]
    }
)
export class ProductRoutingModule{

}