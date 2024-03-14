import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  createUser(user: Omit<User, '$id'>): Observable<User> {
    return from(databases.createDocument(this.databaseId, this.usersCollectionId, ID.unique(), user)).pipe(
      map((result) => result as unknown as User),
      catchError((error) => {
        console.error('Error saving user to database:', error);
        return throwError(() => error);
      }),
    );
  }

  getAllUsers(): Observable<User[]> {
    return from(databases.listDocuments(this.databaseId, this.usersCollectionId, [Query.limit(20)])).pipe(
      map((result) => result.documents as unknown as User[]),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      }),
    );
  }

  getUserById(userId: string): Observable<User> {
    return from(databases.getDocument(this.databaseId, this.usersCollectionId, userId)).pipe(
      map((result) => result as unknown as User),
      catchError((error) => {
        console.error('Error fetching user:', error);
        return throwError(() => error);
      }),
    );
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    return from(databases.updateDocument(this.databaseId, this.usersCollectionId, userId, userData)).pipe(
      map((result) => result as unknown as User),
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError(() => error);
      }),
    );
  }

  deleteUser(userId: string): Observable<any> {
    return from(databases.deleteDocument(this.databaseId, this.usersCollectionId, userId)).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(() => error);
      }),
    );
  }
}
