import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public userData: IUser) {
    this.userCardForm.patchValue(userData)
  }

  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  private readonly fb = inject(FormBuilder)

  userCardForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  addEditUser(): void {
    this.dialogRef.close({
      ...this.userData,
      ...this.userCardForm.value,
    });
  }
}
