import { Component, inject, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgFor } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor,
    UserCardComponent,
    AsyncPipe,
  ],
  providers: [UsersApiService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public readonly usersService = inject(UsersService);

  deleteUser(userId: number) {
    this.usersService.deleteUser(userId);
  }

  ngOnInit(): void {
    this.usersService.loadUsers();
  }
}
