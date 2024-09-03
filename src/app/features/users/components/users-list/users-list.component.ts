import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgFor } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateEditUserComponent } from '../add-edit-user/create-edit-user.component';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../models/user.interface';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor,
    UserCardComponent,
    AsyncPipe,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [UsersApiService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly usersService = inject(UsersService);
  private readonly matDialog = inject(MatDialog)

  addEditUser(userData?: IUser): void {
    const dialogRef = this.matDialog.open(CreateEditUserComponent, {data: userData})

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe((userData: IUser) => {
      if (userData) {
        this.usersService.addEditUser(userData)
      }
    })
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId);
  }

  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
