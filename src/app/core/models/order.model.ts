import { MenuItem } from "./food-menu-item.model";
import { User } from "./user.model";

export interface Order {
  $id: string;
  user: User;
  menuItems: MenuItem[];
  totalCost: number;
  createdOn: Date;
  paid: boolean,
  status: 'pending' | 'completed' | 'cancelled';
}
