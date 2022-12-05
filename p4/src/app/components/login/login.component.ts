import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { BackendService } from './../../services/backend.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../../app.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''
  authFailed: boolean = false

  constructor(
    private backendService: BackendService,
    private router: Router,
  ) { }

  ngOnInit() { }

  goToRegister() {
    this.router.navigate(['/register'])
  }

  async login() {
    const res = await firstValueFrom(this.backendService.login(this.username, this.password))
    if (res)
      this.router.navigate(['/friends'])
    else
      this.authFailed = true
  }
}
