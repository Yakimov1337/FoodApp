import { Injectable } from '@angular/core';
import { account, databases, ID } from '../core/lib/appwrite';
import { environment } from 'src/environments/environment.local';
import { User, Role } from '../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  // Create user account and save the user to the database
  async createUserAccount(user: { email: string; password: string }) {
    try {
      // Create account using Appwrite's account service
      console.log(user);
      const newAccount = await account.create(ID.unique(), user.email, user.password);

      if (!newAccount) throw Error;
      // Placeholder for avatar URL. Implement your logic to generate or define the avatar URL.
      const avatarUrl = 'https://example.com/avatar.png';

      // Create a new user in the database with additional details
      const newUser: User = {
        accountId: newAccount.$id,
        name: '',
        email: newAccount.email,
        role: Role.Normal,
        orders: [], // Initial empty array for orders
        createdMenuItems: [], // Initial empty array for created menu items
      };
      await this.saveUserToDB(newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user account:', error);
      throw error;
    }
  }

  // Save user details to the database
  private async saveUserToDB(user: Omit<User, '$id'>): Promise<User> {
    try {
      const newUser = await databases.createDocument(
        environment.appwriteDatabaseId,
        environment.userCollectionId,
        ID.unique(),
        user,
      );
      return newUser as unknown as User
    } catch (error) {
      console.error('Error saving user to database:', error);
      throw error;
    }
  }

  // Sign in account
  async signInAccount(email: string, password: string) {
    try {
      const session = await account.createEmailSession(email, password);
      return session;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  // Sign out account
  async signOutAccount() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Implement additional methods for getAccount and getCurrentUser as needed
}
