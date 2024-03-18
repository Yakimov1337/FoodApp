import { MenuItem } from "./food-menu-item.model";
import { User } from "./user.model";

export interface Order {
  $id: string;
  user: User;
  menuItem: MenuItem;
  totalCost: number;
  createdOn: Date;
  status: 'pending' | 'completed' | 'cancelled';
}
