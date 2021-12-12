import { Injectable } from "@angular/core";
import { Hobby } from "../models/hobby.model";
import { Hobbies } from "./hobbies.data";
import { Observable, of } from "rxjs";

@Injectable()
export class HobbyService {

  private hobbies: Hobby[] = Hobbies

  loadHobbies(): Observable<Hobby[]> {
    return of(this.hobbies);
  }

}
