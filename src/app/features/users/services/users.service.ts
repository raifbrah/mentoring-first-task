import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public users: IUser[] = [];

  constructor(private usersApiService: UsersApiService) {}

  ngOnInit(): void {
    this.usersApiService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.users = data;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
