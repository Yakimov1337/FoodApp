import { Injectable } from '@angular/core';
import { Client, Databases, Query } from 'appwrite';
import { environment } from 'src/environments/environment.local';
import { account, databases, ID } from '../core/lib/appwrite';
import { Order } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly databaseId = environment.appwriteDatabaseId;
  private readonly ordersCollectionId = environment.ordersCollectionId;

  //Create an Order
  async createOrder(orderData: Order): Promise<Order> {
    try {
      const result = await databases.createDocument(this.databaseId, this.ordersCollectionId, ID.unique(), orderData);
      return result as unknown as Order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Get all Orders
  async getAllOrders(): Promise<any[]> {
    try {
      const result = await databases.listDocuments(this.databaseId, this.ordersCollectionId, [Query.orderDesc("$createdAt"), Query.limit(20)]);
      if (!result) throw Error;
      return result.documents;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Get a single Order by ID
  async getOrderById(orderId: string): Promise<Order> {
    try {
      const result = await databases.getDocument(this.databaseId, this.ordersCollectionId, orderId);
      return result  as unknown as Order;;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  // Update an Order
  async updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order> {
    try {
      const result = await databases.updateDocument(this.databaseId, this.ordersCollectionId, orderId, orderData);
      return result  as unknown as Order;;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  // Delete an Order
  async deleteOrder(orderId: string): Promise<any> {
    try {
      const result = await databases.deleteDocument(this.databaseId, this.ordersCollectionId, orderId);
      return result;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
}
