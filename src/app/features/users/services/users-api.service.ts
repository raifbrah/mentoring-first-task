import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Произошла ошибка:', error);
    throw new Error(
      'Ошибка при выполнении запроса, проверьте консоль для подробностей.'
    );
  }
}
