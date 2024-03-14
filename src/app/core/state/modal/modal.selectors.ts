import { createSelector } from '@ngrx/store';
import { ModalState } from './modal.reducer';

export const selectModalState = (state: any) => state.modals;

export const selectIsCreateUserModalOpen = createSelector(
  selectModalState,
  (state: ModalState) => state.createUser
);

export const selectIsUpdateUserModalOpen = createSelector(
  selectModalState,
  (state: ModalState) => state.updateUser
);

export const selectIsDeleteUserModalOpen = createSelector(
  selectModalState,
  (state: ModalState) => state.deleteUser
);
