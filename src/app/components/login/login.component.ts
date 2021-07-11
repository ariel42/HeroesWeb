import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    this.apiService.login(username, password).subscribe(() => {
      this.router.navigate(["/heroes"]);
    }, e => alert(e?.error?.message || e?.error || e));
  }

  signup(username: string, password: string) {
    this.apiService.signup(username, password).subscribe(() => {
      this.router.navigate(["/heroes"]);
    }, e => alert(e?.error?.message || e?.error || e));
  }
}
