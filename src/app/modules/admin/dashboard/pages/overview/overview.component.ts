import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/food-menu-item';
import { MenuItemAuctionsTableComponent } from '../../components/menuItem/menuItem-auctions-table/menuItem-auctions-table.component';
import { MenuItemChartCardComponent } from '../../components/menuItem/menuItem-chart-card/menuItem-chart-card.component';
import { MenuItemSingleCardComponent } from '../../components/menuItem/menuItem-single-card/menuItem-single-card.component';
import { MenuItemDualCardComponent } from '../../components/menuItem/menuItem-dual-card/menuItem-dual-card.component';
import { MenuItemHeaderComponent } from '../../components/menuItem/menuItem-header/menuItem-header.component';

@Component({
    selector: 'app-MenuItem',
    templateUrl: './overview.component.html',
    standalone: true,
    imports: [
        MenuItemHeaderComponent,
        MenuItemDualCardComponent,
        MenuItemSingleCardComponent,
        MenuItemChartCardComponent,
        MenuItemAuctionsTableComponent,
    ],
})
export class OverviewComponent implements OnInit {
  menuItem: Array<MenuItem>;

  constructor() {
    this.menuItem = [
      {
        id: 34356771,
        title: 'Beef King Masterburger',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '1,258',
        image: 'https://static.vecteezy.com/system/resources/previews/030/683/552/non_2x/burgers-high-quality-4k-hdr-free-photo.jpg',
        avatar: '',
      },
      {
        id: 34356772,
        title: 'Mock ',
        price: 548.79,
        image: 'https://rare-gallery.com/uploads/posts/510725-burger.jpg',
      },
      {
        id: 34356773,
        title: 'Mock',
        price: 234.88,
        image: 'https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?s=612x612&w=0&k=20&c=lfsA0dHDMQdam2M1yvva0_RXfjAyp4gyLtx4YUJmXgg=',
      },
    ];
  }

  ngOnInit(): void {}
}
