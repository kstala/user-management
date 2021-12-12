import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: 'user-delete-dialog.component.html',
})
export class UserDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserDeleteDialogComponent>) {
  }

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}
