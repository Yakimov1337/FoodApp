import { ID } from 'appwrite';
import { MenuItem } from './food-menu-item.model';
import { Order } from './order.model';

export interface User {
  accountId: string;
  $id?: string;
  name: string;
  email: string;
  imageUrl: URL;
  phoneNumber: string;
  role: Role;
  orders: Order[];
  menuItems: MenuItem[];
}

export enum Role {
  Normal = 'Normal',
  Moderator = 'Moderator',
  Admin = 'Admin',
  SuperAdmin = 'Super Admin',
}
