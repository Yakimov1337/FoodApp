import { MenuItem } from "./food-menu-item.model";

export interface Order {
  $id: string; 
  userId: string;
  items: MenuItem[];
  totalCost: number;
  createdOn: Date;
  status: 'pending' | 'completed' | 'cancelled';
}
