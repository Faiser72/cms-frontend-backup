import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent, AboutUser } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import {
  MatDividerModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatSlideToggleChange,
  MatSlideToggleModule,
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [FooterComponent, HeaderComponent, SidebarComponent, AboutUser],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatMenuModule,
    MatListModule,
    FlexLayoutModule,
    MatSlideToggleModule,
  ],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
  entryComponents: [AboutUser]
})
export class SharedModule { }
