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
    const cartvalue = JSON.stringify([{
      id: 1,
      product: 'Apple'
    }, {
      id: 2,
      product: 'Banana'
    }])

    await Storage.set({
      key: 'products',
      value: cartvalue
    })
  }

  async getItem(){
    const products = await Storage.get({ key: 'products'});
    console.log('our data', JSON.parse(products.value));
  }

}
