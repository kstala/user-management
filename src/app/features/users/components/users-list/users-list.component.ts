import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { map, Observable, switchMap, tap, withLatestFrom } from "rxjs";
import { User } from "../../models/user.model";
import { HobbyService } from "../../services/hobby.service";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { UserDeleteDialogComponent } from "../user-delete-dialog/user-delete-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  displayedColumns: string[] = ['select', 'name', 'lastName', 'email', 'gender', 'age', 'hobbies', 'dateOfBirth', 'address', 'phoneNumber', 'action'];
  selectedIds: string[] = []
  filterForm = new FormGroup({
    filterField: new FormControl('name'),
    filterText: new FormControl('')
  })
  sortField: string
  sortDirection: "asc" | "desc"

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private hobbiesService: HobbyService) {
  }

  ngOnInit(): void {
    this.users$ = this.loadUsersWithHobbies()
  }

  sortUsers({ active, direction }): void {
    this.sortField = active
    this.sortDirection = direction
    this.users$ = this.loadUsersWithHobbies()
  }

  deleteUser(userId: string): void {
    this.openDeleteUsersDialog().subscribe(result => {
      if (result)
        this.users$ = this.userService.deleteUser(userId).pipe(
          switchMap(() => this.loadUsersWithHobbies()),
          tap(() => this.snackBar.open("User has been deleted"))
        )
    })
  }

  deleteSelectedUsers(): void {
    this.openDeleteUsersDialog().subscribe(result => {
        if (result)
          this.users$ = this.userService.deleteUsers(this.selectedIds).pipe(
            switchMap(() => this.loadUsersWithHobbies()),
            tap(() => this.snackBar.open("Users have been deleted"))
          )
      }
    )
  }

  openDeleteUsersDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '250px',
      data: { userId: 'ds' },
    });

    return dialogRef.afterClosed()
  }

  testValueChanges(): void {
    this.users$ = this.loadUsersWithHobbies()
  }

  selectUser(id: string, event: MatCheckboxChange): void {
    if (event.checked)
      this.selectedIds.push(id)
    else
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id)
  }

  isUserSelected(id: string): boolean {
    return this.selectedIds.some(selectedId => selectedId === id)
  }

  private loadUsersWithHobbies(): Observable<User[]> {
    return this.userService.loadUsers(
      this.sortField,
      this.sortDirection,
      this.filterForm.controls['filterField'].value,
      this.filterForm.controls['filterText'].value
    ).pipe(
      withLatestFrom(this.hobbiesService.loadHobbies()),
      map(([users, hobbies]) => {
        return users.map(user => ({
          ...user,
          hobbies: user.hobbies.map(hobbyId => hobbies.find(hobby => hobby.id === hobbyId).name)
        }))
      })
    )
  }

}
