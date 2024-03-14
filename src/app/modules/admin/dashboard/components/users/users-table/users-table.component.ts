import { Component, Input, OnInit } from '@angular/core';
import { UsersTableItemComponent } from '../users-table-item/users-table-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { MenuItem, User } from '../../../../../../core/models';
import { LoaderComponent } from '../../../../../../shared/components/loader/loader.component';

@Component({
  selector: '[users-table]',
  templateUrl: './users-table.component.html',
  standalone: true,
  imports: [NgFor, UsersTableItemComponent, CommonModule, LoaderComponent],
})
export class UsersTableComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() isLoading: boolean = false;

  constructor() {}

  async ngOnInit(): Promise<void> {}
}
