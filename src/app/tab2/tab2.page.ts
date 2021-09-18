import { Component, OnInit } from '@angular/core';
import { DatabaseService, User } from '../services/database/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  users: User[] = [];
  user = {};

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getUsers().subscribe(users => {
          this.users = users;
        })
      }
    });
  }

}
