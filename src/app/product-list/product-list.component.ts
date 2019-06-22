import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit{
//declaring title, images, error message
//i have the images set to true so the show on loading
 pageTitle: string = "Joe's Products";
 imageWidth: number = 50;
 imageMargin: number = 2;
 showImage: boolean = true;
 _listFilter: string;
 errorMessage:string;

 //filter through the list of products
 get listFilter(): string {
     return this._listFilter;
    }
     set listFilter(value: string){
         this._listFilter = value;
         this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter):this.products;
     }
//interfac
filteredProducts: IProduct[];
products: IProduct[] = [
];
constructor(private _productService:ProductService){
}
//filters through the displayed products depending
//on what is beig typed into the input box
performFilter(filterBy:string):IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product)=> product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
}
//will show or not show the product images on the page
toggleImage():void{
    this.showImage = !this.showImage;
}
//deletes a product
deleteProduct(id:string): void {
    this._productService.deleteProduct(id);
}
 ngOnInit(): void {
    this._productService.getProducts().subscribe(products => {
        this.products = products
        this.filteredProducts = this.products;  
 },
 //any errors
    error => this.errorMessage = <any>error);
}
}