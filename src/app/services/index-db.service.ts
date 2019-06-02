import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexDBService {

  constructor() {
    console.log('working!!');
    if (window.indexedDB) {
      this.startDB();
    } else {
      alert('No indexedDB in your browser');
    }
  }

  public totalStars: number;

  startDB() {

    // if (!window.indexedDB) console.log( )
    // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexeddb;

    let request = window.indexedDB.open('StarDB', 1),
    db,
    tx,
    store,
    index;

    request.onupgradeneeded = (e) => {
      let db = request.result;
      let store = db.createObjectStore('StarStore', {keyPath: 'ID'});
      // let store = db.createObjectStore('StarStore', {autoIncrement: true});
      let index = store.createIndex('starTotal', 'starTotal', {unique: false});
    };

    request.onerror = (e) => {
      console.log(`there was an error: ${e.target}`);
    };

    request.onsuccess = (e) => {
      db = request.result;
      tx = db.transaction('StarStore', 'readwrite');
      store = tx.objectStore('StarStore');
      index = store.index('starTotal');

      db.onerror = (e) => {
        console.log(`Error: ${e.target.errorCode}`);
      };

      // store.put({ID: 1, starTotal: 100});

      const totalId = store.get(1);

      totalId.onsuccess = () => {
        this.totalStars = totalId.result;
      };

      const total = index.get(7);

      total.onsuccess = () => {
        // console.log(total.result);
      };

      tx.oncomplete = () => db.close;
    };
  }

}
