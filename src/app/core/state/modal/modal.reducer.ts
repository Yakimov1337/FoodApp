import { createReducer, on } from '@ngrx/store';
import * as ModalActions from './modal.actions';

export interface ModalState {
  createUser: boolean;
  updateUser: boolean;
  deleteUser: boolean;
}

export const initialState: ModalState = {
  createUser: false,
  updateUser: false,
  deleteUser: false,
};

export const modalReducer = createReducer(
  initialState,
  on(ModalActions.openCreateUserModal, state => ({ ...state, createUser: true })),
  on(ModalActions.closeCreateUserModal, state => ({ ...state, createUser: false })),
  on(ModalActions.openUpdateUserModal, state => ({ ...state, updateUser: true })),
  on(ModalActions.closeUpdateUserModal, state => ({ ...state, updateUser: false })),
  on(ModalActions.openDeleteUserModal, state => ({ ...state, deleteUser: true })),
  on(ModalActions.closeDeleteUserModal, state => ({ ...state, deleteUser: false }))
);
