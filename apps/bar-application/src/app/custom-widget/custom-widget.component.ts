import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Component, Input, OnChanges, OnInit } from '@angular/core';
import {throwError, Observable} from 'rxjs';
import {MatTableDataSource} from "@angular/material/table";

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'custom-widget.component',
  styleUrls: ['custom-widget.component.css'],
  templateUrl: 'custom-widget.component.html',
})
export class CustomWidgetComponent implements OnChanges,OnInit  {

  @Input()
  public library: string = 'El9ods';
  magazine: Magazine[] = [];
  novel: Magazine[] = [];
  public dataSourceMagazine  = new MatTableDataSource<Magazine>();
  public dataSourceNovel  = new MatTableDataSource<Novel>();
  displayedColumnsMagazine: string[] = ['id', 'title','price', 'totalUnitsSold', 'publicationDate',"nbPages", "category" ,"nextReleaseDate"];
  displayedColumnsNovel: string[] = ['id', 'title','price', 'totalUnitsSold', 'publicationDate',"nbPages", "category","storySummary"];
  constructor(private http: HttpClient) {}
  apiURL = 'http://localhost:8081';
  
  httpHeaders = new HttpHeaders().set('Accept', 'application/json');
  params = new HttpParams() ;

  getMagazines(): Observable<Magazine[]> {
    
    return this.http.get<Magazine[]>(this.apiURL + '/magazines/byLibraryName', {

      headers: this.httpHeaders,
      params: this.params,
      responseType: 'json'

  })
  }
  getNovels(): Observable<Novel[]> {
    
    return this.http.get<Novel[]>(this.apiURL + '/novels/byLibraryName', {

      headers: this.httpHeaders,
      params: this.params,
      responseType: 'json'

  })
  }
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
  ngOnChanges() {
    this.params = new HttpParams().set("libraryName",this.library)
    this.loadMagazines()
    this.loadNovels()
  }
  ngOnInit() {
    this.params = new HttpParams().set("libraryName",this.library)
    this.loadMagazines()
    this.loadNovels()
  }
  loadMagazines() {
    return this.getMagazines().subscribe((res)=>{
      console.log(res);
      this.dataSourceMagazine.data = res;
    })
  }
  loadNovels() {
    return this.getNovels().subscribe((res)=>{
      console.log(res);
      this.dataSourceNovel.data = res;
    })
  }
}


export interface Magazine {
  id: number;
  title: string;
  price: number;
  totalUnitsSold: number;
  publicationDate : string;
  nbPages : number;
  category : string;
  nextReleaseDate : string;
}
export interface Novel {
  id: number;
  title: string;
  price: number;
  totalUnitsSold: number;
  publicationDate : string;
  nbPages : number;
  category : string;
  storySummary : string ;
}