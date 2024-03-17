import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Query } from 'appwrite';
import { environment } from 'src/environments/environment.local';
import { databases, ID } from '../core/lib/appwrite';
import { Order } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly databaseId = environment.appwriteDatabaseId;
  private readonly ordersCollectionId = environment.ordersCollectionId;

  // Create an Order
  createOrder(orderData: Order): Observable<Order> {
    return from(databases.createDocument(this.databaseId, this.ordersCollectionId, ID.unique(), orderData)).pipe(
      map(result => result as unknown as Order),
      catchError(error => {
        console.error('Error creating order:', error);
        throw error;
      })
    );
  }

  // Get all Orders
  getAllOrders(): Observable<Order[]> {
    return from(databases.listDocuments(this.databaseId, this.ordersCollectionId, [Query.orderDesc("$createdAt"), Query.limit(20)])).pipe(
      map(result => {
        if (!result) throw new Error('No result');
        return result.documents as unknown as Order[];
      }),
      catchError(error => {
        console.error('Error fetching orders:', error);
        throw error;
      })
    );
  }

  // Get a single Order by ID
  getOrderById(orderId: string): Observable<Order> {
    return from(databases.getDocument(this.databaseId, this.ordersCollectionId, orderId)).pipe(
      map(result => result as unknown as Order),
      catchError(error => {
        console.error('Error fetching order:', error);
        throw error;
      })
    );
  }

  // Update an Order
  updateOrder(orderId: string, orderData: Partial<Order>): Observable<Order> {
    return from(databases.updateDocument(this.databaseId, this.ordersCollectionId, orderId, orderData)).pipe(
      map(result => result as unknown as Order),
      catchError(error => {
        console.error('Error updating order:', error);
        throw error;
      })
    );
  }

  // Delete an Order
  deleteOrder(orderId: string): Observable<void> {
    return from(databases.deleteDocument(this.databaseId, this.ordersCollectionId, orderId)).pipe(
      map(() => undefined), // Mapping to void
      catchError(error => {
        console.error('Error deleting order:', error);
        throw error;
      })
    );
  }
}
