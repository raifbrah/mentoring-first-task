import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: IUser;
  @Output() deleteUserEvent = new EventEmitter<number>();

  deleteUser() {
    this.deleteUserEvent.emit(this.user.id)
  }
}
