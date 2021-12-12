import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { map, Observable, of } from "rxjs";
import * as _ from 'lodash';
import { Users } from "./users.data";

@Injectable()
export class UserService {

  private users: User[] = Users

  filterUsers(filterColumn: string, filterText: string): Observable<User[]> {
    return of(this.users).pipe(
      map(users => users.filter(user => user[filterColumn].contains(filterText)))
    )
  }

  loadUser(id: string): Observable<User> {
    return of(this.users).pipe(
      map(users => users.find(user => user.id === id))
    )
  }

  loadUsers(sortField?: string, sortDirection?: "asc" | "desc", filterColumn?: string, filterText?: string): Observable<User[]> {
    return of(this.users)
      .pipe(
        map(users => {
            if (sortField && sortDirection)
              return _.orderBy(users, sortField, sortDirection)
            else
              return users
          }
        ),
        map(users => {
          if (filterColumn && filterText)
            return users.filter(user => user[filterColumn].toString().toLowerCase().includes(filterText.toLocaleLowerCase()))
          else return users
        })
      );
  }

  saveUser(userToSave: User): Observable<boolean> {
    const userToSaveIndex = this.users.findIndex(user => user.id === userToSave.id)
    if (userToSaveIndex >= 0) {
      this.users[userToSaveIndex] = userToSave
      return of(true)
    } else
      return of(false)
  }

  deleteUser(userId: string): Observable<boolean> {
    this.users = this.users.filter(user => user.id !== userId)
    return of(true)
  }

  deleteUsers(userIds: string[]): Observable<boolean> {
    this.users = this.users.filter(user => !userIds.some(id => id === user.id))
    return of(true)
  }

}

