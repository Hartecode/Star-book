import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexDBService implements OnDestroy {

  private db;
  private store;
  public totalStars: number;


  constructor() {
  }

  startDB(): boolean {
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
      console.log(`success: ${JSON.stringify(this.db)}`);
    };

    return true;
  }


  add(num: number) {
    const transaction = this.db.transaction('StarStore', 'readwrite')
    const objectStore = transaction.objectStore('StarStore');
    const request = objectStore.put({ ID: 1, starTotal: num });

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
    const request = objectStore.get(1);

    request.onerror = (e) => {
      console.log('Unable to retrieve data from database!');
    };

    request.onsuccess = (e) => {
      // Do something with the request.result!
      if (request.result) {
          console.log(`The current results are ${request.result.starTotal}`);
          return request.result.starTotal;
      } else {
          console.log('Can\'t find info in database!');
      }
    };
  }

  ngOnDestroy() {
    if (window.indexedDB) {
      this.db.close();
    }
  }
}
