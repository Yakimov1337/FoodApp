import { createReducer, on } from '@ngrx/store';
import * as ModalActions from './modal.actions';
import { User } from '../../models';
import { ID } from 'appwrite';

export interface ModalState {
  createUser: boolean;
  updateUser: boolean;
  deleteUser: boolean;
  deleteUserId: string | null | undefined; 
  editingUser: User | null;
}

export const initialState: ModalState = {
  createUser: false,
  updateUser: false,
  deleteUser: false,
  deleteUserId: null,
  editingUser: null,
};

export const modalReducer = createReducer(
  initialState,
  on(ModalActions.openCreateUserModal, state => ({ ...state, createUser: true })),
  on(ModalActions.closeCreateUserModal, state => ({ ...state, createUser: false })),
  on(ModalActions.openUpdateUserModal, (state, { user }) => ({ ...state, updateUser: true, editingUser: user })),
  on(ModalActions.closeUpdateUserModal, state => ({ ...state, updateUser: false})),
  on(ModalActions.openDeleteUserModal, (state, { userId }) => ({ ...state, deleteUser: true, deleteUserId: userId })),
  on(ModalActions.closeDeleteUserModal, state => ({ ...state, deleteUser: false}))
);
