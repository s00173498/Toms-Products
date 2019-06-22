import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IProduct } from '../product-list/product';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

//import 'rxjs/add/observable/throw';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/do';


@Injectable()
export class ProductService {
private _productUrl = 'http://localhost:3000/products';
//collections arrays
productsCollection: AngularFirestoreCollection<IProduct>;
products: Observable<IProduct[]>;
allProducts: IProduct[];
errorMessage: string; 

  constructor(private _http: HttpClient, private _afs:AngularFirestore) { 
    this.productsCollection = _afs.collection<IProduct>("products");
  }
//add products to a collection
 addProduct(products: IProduct): void{
   this.productsCollection.add(products);
 }
//get the products from the collection
//and display them
  getProducts(): Observable<IProduct[]> {
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IProduct;
        console.log("getProducts:data" + JSON.stringify(data));
        const id = a.payload.doc.id;
        console.log("getProducts:id = "+id);
        return{id, ...data};
      }))
    );
    return this.products;
    // this.products = this.productsCollection.valueChanges();

    // this.products.subscribe(data => console.log("getProducts" + data));
    // return this.products;
    // return this._http.get<IProduct[]>(this._productUrl).pipe(
    // tap(data => console.log('All: ' + JSON.stringify(data))),
    // catchError(this.handleError));

   
  }

  addAllProducts(){
    this._http.get<IProduct[]>(this._productUrl).subscribe(
        products => {
        this.allProducts = products;
        for(let product of this.allProducts){
          console.log("Adding: " + product.productName);
          this.productsCollection.add(product);
        }

      },
      error => (this.errorMessage = <any>error)
      
    );
  }
//delete any products
  deleteProduct(id:string): void {
    this.productsCollection.doc(id).delete()
    .catch(error => {console.log("deleteProduct error:"+error);})
    .then(() => console.log('deleteProduct: id = '+id));
  }
//any errors
private handleError(err: HttpErrorResponse){
  console.log(err.message);
  return Observable.throw(err.message);
}
}
