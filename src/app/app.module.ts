import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { NavigationComponent } from "./navigation/navigation.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { NgxSpinnerModule } from "ngx-spinner";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { DefaultModule } from "./layouts/default/default.module";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { LoginModule } from './modules/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './modules/service/authentication/authentication.service';
import { HttpInterceptorService } from './modules/service/authentication/http_Interceptor/http-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    LoginModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
