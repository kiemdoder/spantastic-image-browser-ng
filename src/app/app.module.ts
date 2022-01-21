import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TopicsListComponent} from './components/topics-list/topics-list.component';
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {PictureFrameComponent} from './components/picture-frame/picture-frame.component';
import {PictureScrollerComponent} from './components/picture-scroller/picture-scroller.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {CarouselModule} from "primeng/carousel";
import {ImageModule} from "primeng/image";

const matImports = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatSidenavModule,
  ScrollingModule
];

const primeNgImports = [
  CarouselModule,
  ImageModule
]

@NgModule({
  declarations: [
    AppComponent,
    TopicsListComponent,
    PictureFrameComponent,
    PictureScrollerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...matImports,
    ...primeNgImports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
