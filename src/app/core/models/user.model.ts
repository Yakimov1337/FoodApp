import { ID } from 'appwrite';
import { MenuItem } from './food-menu-item.model';
import { Order } from './order.model';

export interface User {
  accountId: ID;
  name: string;
  email: string;
  imageUrl: URL;
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
