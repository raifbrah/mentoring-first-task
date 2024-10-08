import { inject, Injectable, OnDestroy } from '@angular/core';
import { IUser } from '../models/user.interface';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]); // Создали реактивное состояние
  public readonly users$ = this.usersSubject$.asObservable();

  private readonly usersApiService = inject(UsersApiService)

  addEditUser(user: IUser) {
    if (user.id) {
      this.usersSubject$.next(
        this.usersSubject$.value.map((mapUser: IUser) => {
          return mapUser.id === user.id
            ? { ...mapUser, ...user }
            : mapUser;
        })
      );
    } else {
      this.usersSubject$.next([
        ...this.usersSubject$.value,
        {
          ...user,
          id: Date.now(),
        },
      ]);
    }
  }

  deleteUser(userId: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter(filterUser => {
        return filterUser.id !== userId
      })
    )
  }

  loadUsers() {
    this.usersApiService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((usersData: IUser[]) => {
        this.usersSubject$.next(usersData);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
