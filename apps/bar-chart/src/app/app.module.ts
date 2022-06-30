import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CustomWidgetComponent } from './custom-widget/custom-widget.component';
import { WidgetcoreModule } from '@minotoreproject/widgetcore';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular-highcharts';



@NgModule({
  declarations: [CustomWidgetComponent, AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    WidgetcoreModule,
    ChartModule,
  ],
  providers: [CookieService],
  entryComponents: [CustomWidgetComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(
      CustomWidgetComponent,
      this.injector
    );
    const element = createCustomElement(CustomWidgetComponent, {
      injector: this.injector,
      strategyFactory
    });
    // the name (first argument of the define function) has to be the same name as the custom widget 
    // component selector  (global configuration fetching by the widget selector)
    customElements.define('bar-chart', element);
  }
}
