import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { databases, ID } from '../core/lib/appwrite';
import { MenuItem } from '../core/models';
import { environment } from 'src/environments/environment.local';
import { Query } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class MenuItemsService {
  private readonly databaseId = environment.appwriteDatabaseId;
  private readonly MenuItemsCollectionId = environment.menuItemsCollectionId;

  // Create an MenuItem
  createMenuItem(menuItemData: MenuItem): Observable<MenuItem> {
    return from(databases.createDocument(this.databaseId, this.MenuItemsCollectionId, ID.unique(), menuItemData)).pipe(
      map(result => result as unknown as MenuItem),
      catchError(error => {
        console.error('Error creating MenuItem:', error);
        throw error;
      })
    );
  }

  // Get all MenuItems
  getAllMenuItems(): Observable<MenuItem[]> {
    return from(databases.listDocuments(this.databaseId, this.MenuItemsCollectionId, [Query.orderAsc("$createdAt"), Query.limit(20)])).pipe(
      map(result => {
        if (!result) throw new Error('No result');
        return result.documents as unknown as MenuItem[];
      }),
      catchError(error => {
        console.error('Error fetching MenuItems:', error);
        throw error;
      })
    );
  }

  // Get a single MenuItem by ID
  getMenuItemById(menuItemId: string): Observable<MenuItem> {
    return from(databases.getDocument(this.databaseId, this.MenuItemsCollectionId, menuItemId)).pipe(
      map(result => result as unknown as MenuItem),
      catchError(error => {
        console.error('Error fetching MenuItem:', error);
        throw error;
      })
    );
  }

  // Update an MenuItem
  updateMenuItem(menuItemId: string, menuItemData: Partial<MenuItem>): Observable<MenuItem> {
    return from(databases.updateDocument(this.databaseId, this.MenuItemsCollectionId, menuItemId, menuItemData)).pipe(
      map(result => result as unknown as MenuItem),
      catchError(error => {
        console.error('Error updating MenuItem:', error);
        throw error;
      })
    );
  }

  // Delete an MenuItem
  deleteMenuItem(menuItemId: string): Observable<void> {
    return from(databases.deleteDocument(this.databaseId, this.MenuItemsCollectionId, menuItemId)).pipe(
      map(() => undefined), // Converting to void
      catchError(error => {
        console.error('Error deleting MenuItem:', error);
        throw error;
      })
    );
  }
}
