import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Store } from '@ngrx/store';
import { User } from '../../../../../../core/models';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { openDeleteUserModal, openUpdateUserModal } from '../../../../../../core/state/modal/modal.actions';
@Component({
  selector: '[users-table-item]',
  templateUrl: './users-table-item.component.html',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, ButtonComponent],
})
export class UsersTableItemComponent implements OnInit {
  @Input() user: User = <User>{};

  constructor(private store: Store) {}

  ngOnInit(): void {}

  openUpdateModal() {
    this.store.dispatch(openUpdateUserModal({ user: this.user }));
  }

  openDeleteModal() {
    this.store.dispatch(openDeleteUserModal({ userId: this.user.$id }));
  }
}
