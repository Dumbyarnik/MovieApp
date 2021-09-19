import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor() {}

  ngOnInit(){

  }

  async setItem(){
    const user = JSON.stringify([{
      name: 'user',
      password: 'user',
      movies_want: [12, 13, 14]
    }])

    await Storage.set({
      key: 'user',
      value: user
    })
  }

  async showItem(){
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);
    console.log('data: ', data[0].movies_want);
  }

  async clearStorage(){
    await Storage.clear();
  }

}
