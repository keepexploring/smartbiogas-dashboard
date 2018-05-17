import {
  Component,
  OnInit,
  OnChanges,
  SimpleChange,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../services/auth.service";
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {
  isAuthenticated = false;
  isLoading = true;

  constructor(
    private auth: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  logOut() {
    this.auth.logOut();
    this.isAuthenticated = false;
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    this.auth.validateToken().subscribe(authenticated => {
      console.log("Authenticated?", authenticated);
      this.isAuthenticated = this.auth.authenticated;
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.isAuthenticated = this.auth.authenticated;
  }

  ngOnDestroy() {}
}
