import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8000";

  constructor() {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems() {
    return this.items;
  }

  removeItem(index) {
    this.items.splice(index, 1)
    this.dataChangeSubject.next(true);
  }
  
  addItem(item) {
    this.items.push(item);
    this.dataChangeSubject.next(true);
  }

  editItem(item, index) {
    this.items[index] = item;
    this.dataChangeSubject.next(true);
  }
}
