import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../../../../../core/models';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';


@Component({
    selector: '[users-table-item]',
    templateUrl: './users-table-item.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe, ButtonComponent,CommonModule],
})
export class UsersTableItemComponent implements OnInit {
  @Input() user: User = <User>{};
  constructor() {}


  ngOnInit(): void {}
}
