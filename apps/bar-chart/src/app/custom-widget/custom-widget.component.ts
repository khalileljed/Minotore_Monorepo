import { Component,Input, OnChanges ,OnInit } from '@angular/core';
import { MinotoreWidgetService } from '@minotoreproject/widgetcore';
import {Options}  from 'highcharts';
import {Chart}  from 'angular-highcharts';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';

@Component({
  selector: 'bar-chart',
  templateUrl: './custom-widget.component.html',
  styleUrls: ['./custom-widget.component.css'],
  providers: [MinotoreWidgetService]
})
export class CustomWidgetComponent implements OnChanges,OnInit {
  constructor(private http: HttpClient) { }
  book: Book[] = [];
  data = Array<Data>();
  option: Options
  chart: Chart 
  
  apiURL = 'http://localhost:8082';

  @Input()
  public library: string = 'el9ods';
  httpHeaders = new HttpHeaders().set('Accept', 'application/json');
  params = new HttpParams();
  

getBooks(): Observable<Book[]> {
    
  return this.http.get<Book[]>(this.apiURL + '/documents/byLibraryName', {

    headers: this.httpHeaders,
    params: this.params,
})
}
loadBooks() {
  this.option = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Book Sales Statistics'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
      title: {
        text: 'Books'
    },
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total Books Market Sales'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.0f}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.sum:.2f}</b> TND<br/>'
    },
    series: [
      {
        colorByPoint: true,
        name : this.library,
        data: this.data,
        type: 'column' 
      }
    ]
};
  return this.getBooks().subscribe((res)=>{
    for (let i = 0; i < res.length; i++) {
      var d = <Data>{};
      d.name = res[i]["bookName"];
      d.y = res[i]["unitSold"];
      d.sum = res[i]["unitSold"]*res[i]["bookPrice"];
     this.data.push(d);
    }
    console.log(this.data);
    this.chart = new Chart(this.option);
  })
}

  ngOnChanges() {
   this.params = new HttpParams().set("libraryName",this.library)
   this.loadBooks()
  }

  ngOnInit() {
    this.params = new HttpParams().set("libraryName",this.library)
    this.loadBooks()
   }


}
export interface Book {
  id: number;
  libraryName: string;
  bookName: string;
  bookPrice: number;
  unitSold : number;
};
export interface Data {
  name: string;
  y : number;
  sum : number;
};