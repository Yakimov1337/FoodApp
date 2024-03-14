import { Injectable } from '@angular/core';
import { Client, Databases, Query } from 'appwrite';
import { environment } from 'src/environments/environment.local';
import { account, databases, ID } from '../core/lib/appwrite';
import { MenuItem } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class MenuItemsService {
  private readonly databaseId = environment.appwriteDatabaseId;
  private readonly MenuItemsCollectionId = environment.menuItemsCollectionId;

  //Create an MenuItem
  async createMenuItem(MenuItemData: MenuItem): Promise<MenuItem> {
    try {
      const result = await databases.createDocument(this.databaseId, this.MenuItemsCollectionId, ID.unique(), MenuItemData);
      return result as unknown as MenuItem;
    } catch (error) {
      console.error('Error creating MenuItem:', error);
      throw error;
    }
  }

  // Get all MenuItems
  async getAllMenuItems(): Promise<any[]> {
    try {
      const result = await databases.listDocuments(this.databaseId, this.MenuItemsCollectionId, [Query.orderAsc("$createdAt"), Query.limit(20)]);
      if (!result) throw Error;
      console.log(result)
      return result.documents;
    } catch (error) {
      console.error('Error fetching MenuItems:', error);
      throw error;
    }
  }

  // Get a single MenuItem by ID
  async getMenuItemById(MenuItemId: string): Promise<MenuItem> {
    try {
      const result = await databases.getDocument(this.databaseId, this.MenuItemsCollectionId, MenuItemId);
      return result  as unknown as MenuItem;;
    } catch (error) {
      console.error('Error fetching MenuItem:', error);
      throw error;
    }
  }

  // Update an MenuItem
  async updateMenuItem(MenuItemId: string, MenuItemData: Partial<MenuItem>): Promise<MenuItem> {
    try {
      const result = await databases.updateDocument(this.databaseId, this.MenuItemsCollectionId, MenuItemId, MenuItemData);
      return result  as unknown as MenuItem;;
    } catch (error) {
      console.error('Error updating MenuItem:', error);
      throw error;
    }
  }

  // Delete an MenuItem
  async deleteMenuItem(MenuItemId: string): Promise<any> {
    try {
      const result = await databases.deleteDocument(this.databaseId, this.MenuItemsCollectionId, MenuItemId);
      return result;
    } catch (error) {
      console.error('Error deleting MenuItem:', error);
      throw error;
    }
  }
}
