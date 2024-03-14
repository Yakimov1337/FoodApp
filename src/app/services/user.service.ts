import { Injectable } from '@angular/core';
import { Query } from 'appwrite';
import { environment } from 'src/environments/environment.local';
import { databases, ID } from '../core/lib/appwrite';
import { User } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly databaseId = environment.appwriteDatabaseId;
  private readonly usersCollectionId = environment.userCollectionId;

  //Create an user
  // Save user details to the database
  async createUser(user: Omit<User, '$id'>): Promise<User> {
    try {
      const newUser = await databases.createDocument(
        environment.appwriteDatabaseId,
        environment.userCollectionId,
        ID.unique(),
        user,
      );
      return newUser as unknown as User;
    } catch (error) {
      console.error('Error saving user to database:', error);
      throw error;
    }
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    try {
      const result = await databases.listDocuments(this.databaseId, this.usersCollectionId, [Query.limit(20)]);
      if (!result) throw Error;
      return result.documents as unknown as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get a single user by ID
  async getUserById(userId: string): Promise<User> {
    try {
      const result = await databases.getDocument(this.databaseId, this.usersCollectionId, userId);
      return result as unknown as User;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Update an user
  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const result = await databases.updateDocument(this.databaseId, this.usersCollectionId, userId, userData);
      return result as unknown as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete an user
  async deleteUser(userId: string): Promise<any> {
    try {
      const result = await databases.deleteDocument(this.databaseId, this.usersCollectionId, userId);
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
