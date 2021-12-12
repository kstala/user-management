import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SharedModule } from "../../shared/shared.module";
import { UserService } from "./services/user.service";
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { HobbyService } from "./services/hobby.service";
import { UserDeleteDialogComponent } from "./components/user-delete-dialog/user-delete-dialog.component";

@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailsComponent,
    UserDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [UserService, HobbyService]
})
export class UsersModule {
}
