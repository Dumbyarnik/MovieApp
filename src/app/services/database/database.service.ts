import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


export interface User {
  name: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  users = new BehaviorSubject([]);

  constructor(private plt: Platform, 
    private sqlitePorter: SQLitePorter, 
    private sqlite: SQLite, private http: HttpClient) { 
      this.plt.ready().then(() => {
        this.sqlite.create({
          name: 'movieapp.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.database = db;
            this.userDatabase();
        });
      });
    }

    userDatabase() {
      // code from the video
      /*this.http.get('assets/userDatabase.sql', { responseType: 'text'})
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadUsers();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });*/

      // my code 
      this.database.executeSql('CREATE TABLE IF NOT EXISTS users(name TEXT PRIMARY KEY,password TEXT);');
      this.database.executeSql('INSERT or IGNORE INTO users VALUES ("user", "user");');
    }

    getDatabaseState() {
      return this.dbReady.asObservable();
    }
   
    getUsers(): Observable<User[]> {
      return this.users.asObservable();
    }

    loadUsers() {
      return this.database.executeSql('SELECT * FROM users', []).then(data => {
        let users: User[] = [];
   
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
              
            users.push({ 
              name: data.rows.item(i).name, 
              password: data.rows.item(i).password 
             });
          }
        }
        this.users.next(users);
      });
    }
   
}
