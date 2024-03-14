import { createAction } from '@ngrx/store';

export const openCreateUserModal = createAction('[Modal] Open Create User Modal');
export const closeCreateUserModal = createAction('[Modal] Close Create User Modal');

export const openUpdateUserModal = createAction('[Modal] Open Update User Modal');
export const closeUpdateUserModal = createAction('[Modal] Close Update User Modal');

export const openDeleteUserModal = createAction('[Modal] Open Delete User Modal');
export const closeDeleteUserModal = createAction('[Modal] Close Delete User Modal');
