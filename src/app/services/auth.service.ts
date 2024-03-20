import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { account, avatars, databases, ID } from '../core/lib/appwrite';
import { environment } from 'src/environments/environment.local';
import { User, Role } from '../core/models/user.model';
import { isValidUrl } from '../shared/validators/url-validator';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly databaseId = environment.appwriteDatabaseId;
  private readonly usersCollectionId = environment.userCollectionId;

  // Create user account using Appwrite's SDK and save the user to the database
  createUserAccount(user: {
    email: string;
    password: string;
    name?: string;
    phoneNumber?: string;
    imageUrl?: URL;
  }): Observable<User> {
    return from(account.create(ID.unique(), user.email, user.password)).pipe(
      catchError((error) => {
        console.error('Error creating user account:', error);
        return throwError(() => error);
      }),
      switchMap((newAccount) => { // WAIT for saveUserToDB to complete
        if (!newAccount) throw new Error('Account creation failed');
        const avatarUrl = avatars.getInitials(user.email);

        const newUser: User = {
          accountId: newAccount.$id,
          name: user.name ?? '',
          phoneNumber: user.phoneNumber ?? '',
          email: newAccount.email,
          role: Role.Normal,
          imageUrl: user.imageUrl && isValidUrl(user.imageUrl) ? user.imageUrl : avatarUrl,
          orders: [],
          menuItems: [],
        };

        return this.saveUserToDB(newUser); // Return the saveUserToDB observable
      }),
      catchError((error) => {
        console.error('Error saving user to database:', error);
        return throwError(() => error);
      }),
    );
  }
  // Save user details to the database
  private saveUserToDB(user: Omit<User, '$id'>): Observable<User> {
    return from(databases.createDocument(this.databaseId, this.usersCollectionId, ID.unique(), user)).pipe(
      catchError((error) => {
        console.error('Error saving user to database:', error);
        return throwError(() => error);
      }),
      map((newUser) => newUser as unknown as User),
    );
  }

  // Sign in account
  signInAccount(email: string, password: string): Observable<any> {
    return from(account.createEmailSession(email, password)).pipe(
      catchError((error) => {
        console.error('Error signing in:', error);
        return throwError(() => error);
      }),
    );
  }

  // Sign out account
  signOutAccount(): Observable<any> {
    return from(account.deleteSession('current')).pipe(
      catchError((error) => {
        console.error('Error signing out:', error);
        return throwError(() => error);
      }),
    );
  }
}
