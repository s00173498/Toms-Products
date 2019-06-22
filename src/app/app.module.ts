//importing loads of stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
//import { AuthService } from './core/auth.service'
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { convertToSpaces } from './shared/convert-to-spaces.pipe';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from'@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

//import components
import { AddProductComponent } from './add-product/add-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule,} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../app/service/auth.guard';
//import { AuthService } from './shared/auth.service';

import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';
import { DisplayClipartComponent } from './display-clipart/display-clipart.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import { UserComponent } from './user/user.component'
import { AuthService } from './service/auth.service';

  //import { MatListModule, MatListModule } from '@angular/material/list';
  // BrowserAnimationsModule
  
library.add(faCoffee);
library.add(faStar);
library.add(faTrashAlt);

//routes for bring user to various pages
//can go to login and register pages without being logged in
//because these dont have authguard
//all other pages guarded with authguard only available 
//with suucessful register/login
const routes: Routes = [
  {path: '', redirectTo:'signup', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'home', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo:'login', canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    convertToSpaces,
    StarRatingComponent,
    AddProductComponent,
    LoginComponent,
    NavbarComponent,
    NotificationsComponent,
    SignupComponent,
    DisplayClipartComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase,),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes)

  ],
  
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
