import { Component, OnInit } from '@angular/core';
// import { IProduct } from './product';
import { ProductService } from '../shared/product.service';
import { IProduct } from '../product-list/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductService]
})
export class AddProductComponent {
  listFilter: string;
  constructor(
    private _productService: ProductService, private router: Router ) { }
  //   products: IProduct[] = [];

//declare variables
productId: number;
productName: string;
productCode: string;
releaseDate: string;
description: string;
price: number;
starRating: number;
imageStr: string;
imageUrl: string;
showDisplayClipartComponent: boolean;

//controls hiding the componet until the button press
showHideDisplayClipartComponent(): boolean{
  this.showDisplayClipartComponent = !this.showDisplayClipartComponent;
  return false;
}
//recieves the URL string from the display-clipart component
//and displays in the text box
addImageStringToFormTextBox(evt): boolean {
  this.imageUrl = evt;
  return false;
}
//shows following info in the console
addProduct(): void{
console.log("productId =" + this.productId);
console.log("productName =" + this.productName);
console.log("productCode =" + this.productCode);
console.log("productDate =" + this.releaseDate);
console.log("description =" + this.description);
console.log("price =" + this.price);
console.log("starRating =" + this.starRating);
console.log("imageStr =" + this.imageStr);
console.log("imageUrl =" + this.imageUrl);
let products:IProduct = {
  productId:this.productId,
  productName:this.productName,
  productCode:this.productCode,
  releaseDate:this.releaseDate,
  description:this.description,
  price:this.price,
  starRating:this.starRating,
  imageStr:this.imageStr,
  imageUrl:this.imageUrl,
};
this._productService.addProduct(products);
//redirect to the product-list component
this.router.navigate(['/product-list']);
}
  // ngOnInit() {
  // }
}
