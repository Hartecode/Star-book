import { Component } from '@angular/core';
import { IndexDBService } from './services/index-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loaded: boolean;

  constructor(private dataBase: IndexDBService) {
    if (window.indexedDB) {
      this.loaded = this.dataBase.startDB();
    } else {
      alert(`Your browser doesn't support indexedDB`);
    }
  }

}
