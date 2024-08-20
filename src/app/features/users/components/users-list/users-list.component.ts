import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgFor } from '@angular/common';
import { IUser } from '../../models/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, AsyncPipe],
  providers: [UsersApiService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  constructor(private usersApiService: UsersApiService) {
    this.usersApiService = this.usersApiService;
  }

  users$!: Observable<IUser[]>;

  ngOnInit(): void {
    this.users$ = this.usersApiService.getUsers();
    this.usersApiService
      .getUsers()
      .subscribe((response) => console.log(response));
  }
}
