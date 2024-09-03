import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: IUser;
  @Output() deleteUserEvent = new EventEmitter<number>();
  @Output() editUserEvent = new EventEmitter<IUser>();

  deleteUser() {
    this.deleteUserEvent.emit(this.user.id)
  }

  editUser() {
    this.editUserEvent.emit(this.user)
  }
}
