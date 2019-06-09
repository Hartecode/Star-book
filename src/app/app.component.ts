import { Component } from '@angular/core';
import { IndexDBService } from './services/index-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loaded: boolean;

  constructor(public dataBase: IndexDBService) {
    if (window.indexedDB) {
      this.dataBase.startDB();
      this.loaded = this.dataBase.loaded;
    } else {
      alert(`Your browser doesn't support indexedDB`);
    }
  }

}
