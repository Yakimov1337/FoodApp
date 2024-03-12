import { ID } from 'appwrite';
import { MenuItem } from './food-menu-item.model';
import { Order } from './order.model';

export interface User {
  accountId: ID;
  name: string;
  email: string;
  role: Role;
  orders: Order[];
  createdMenuItems: MenuItem[];
}

export enum Role {
  'Normal',
  'Moderator',
  'Admin',
  'Super Admin',
}
