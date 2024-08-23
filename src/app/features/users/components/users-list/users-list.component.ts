import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgFor } from '@angular/common';
import { IUser } from '../../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, AsyncPipe],
  providers: [UsersApiService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly usersApiService: UsersApiService,
    public readonly usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.usersApiService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((usersData: IUser[]) => {
        this.usersService.addEditUsers(usersData)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
