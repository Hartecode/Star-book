import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexDBService implements OnDestroy {

  private db;
  private store;
  private totalStarsBS = new BehaviorSubject(0);
  public totalStars$ = this.totalStarsBS.asObservable();
  public loaded = false;


  constructor() {
  }

  startDB() {
    const request = window.indexedDB.open('StarDB', 1);

    request.onupgradeneeded = (e) => {
      // The database did not previously exist, so create object stores and indexes.
      this.db = request.result;
      this.store = this.db.createObjectStore('StarStore', {keyPath: 'ID'});
      this.store.put({ID: 1, starTotal: 0});
    };

    request.onerror = (e) => {
      console.log(`there was an error: ${e.target}`);
    };

    request.onsuccess = (e) => {
      this.db = request.result;
      console.log(`success: ${JSON.stringify(Object.keys(this.db.objectStoreNames))}`, request);
      this.read();
      this.loaded = true;
    };
  }


  add(num: number) {
    const transaction = this.db.transaction('StarStore', 'readwrite');
    const objectStore = transaction.objectStore('StarStore');
    const request = objectStore.put({ ID: '1', starTotal: num });

    request.onsuccess = function(e) {
      console.log(`updated a value in db to ${num}`);
    };

    request.onerror = function(e) {
      e.preventDefault();
      console.log(request.error);
      console.log(`Unable to update the db: ${JSON.stringify(e.target)}`);
    };
  }

  read() {
    const transaction = this.db.transaction('StarStore');
    const objectStore = transaction.objectStore('StarStore');
    const request = objectStore.get('1');

    let total: number;

    request.onerror = (e) => {
      console.log('Unable to retrieve data from database!');
    };

    request.onsuccess = (e) => {
      // Do something with the request.result!
      if (request.result) {
          console.log(`The current results are ${request.result.starTotal}`);
          total = request.result.starTotal;
          this.totalStarsBS.next(total);
      } else {
          console.log('Can\'t find info in database!');
      }
    };
  }

  setAmount() {
  }

  ngOnDestroy() {
    if (window.indexedDB) {
      this.db.close();
    }
  }
}
