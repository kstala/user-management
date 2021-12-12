import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Observable, tap } from "rxjs";
import { User } from "../../models/user.model";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Hobby } from "../../models/hobby.model";
import { HobbyService } from "../../services/hobby.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user$: Observable<User>
  hobbies$: Observable<Hobby[]>

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', Validators.required),
    gender: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
    dateOfBirth: new FormControl(''),
    hobbies: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService,
              private hobbyService: HobbyService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.hobbies$ = this.hobbyService.loadHobbies()
    this.user$ = this.route.params.pipe(
      switchMap(params => this.userService.loadUser(params['id'])),
      tap(user => {
        this.userForm.controls['name'].setValue(user.name)
        this.userForm.controls['lastName'].setValue(user.lastName)
        this.userForm.controls['email'].setValue(user.email)
        this.userForm.controls['age'].setValue(user.age)
        this.userForm.controls['gender'].setValue(user.gender)
        this.userForm.controls['phoneNumber'].setValue(user.phoneNumber)
        this.userForm.controls['address'].setValue(user.address)
        this.userForm.controls['dateOfBirth'].setValue(user.dateOfBirth)
        this.userForm.controls['hobbies'].setValue(user.hobbies)
      })
    )
  }

  saveUser(userToSaveId: string): void {
    const userToSave: User = {
      id: userToSaveId,
      name: this.userForm.controls['name'].value,
      lastName: this.userForm.controls['lastName'].value,
      email: this.userForm.controls['email'].value,
      age: this.userForm.controls['age'].value,
      gender: this.userForm.controls['gender'].value,
      phoneNumber: this.userForm.controls['phoneNumber'].value,
      address: this.userForm.controls['address'].value,
      dateOfBirth: this.userForm.controls['dateOfBirth'].value,
      hobbies: this.userForm.controls['hobbies'].value
    }

    this.userService.saveUser(userToSave).pipe(
      tap(() => this.snackBar.open("User has been saved"))
    ).subscribe()
  }

  reset(user: User): void {
    this.userForm.controls['name'].setValue(user.name)
    this.userForm.controls['lastName'].setValue(user.lastName)
    this.userForm.controls['email'].setValue(user.email)
    this.userForm.controls['age'].setValue(user.age)
    this.userForm.controls['gender'].setValue(user.gender)
    this.userForm.controls['phoneNumber'].setValue(user.phoneNumber)
    this.userForm.controls['address'].setValue(user.address)
    this.userForm.controls['dateOfBirth'].setValue(user.dateOfBirth)
    this.userForm.controls['hobbies'].setValue(user.hobbies)
  }

}
