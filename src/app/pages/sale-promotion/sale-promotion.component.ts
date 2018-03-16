import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-promotion',
  templateUrl: './sale-promotion.component.html',
  styleUrls: ['./sale-promotion.component.scss']
})
export class SalePromotionComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    // window.location.href ='http://203.154.45.40/Salepromotion/main';
  }

}
