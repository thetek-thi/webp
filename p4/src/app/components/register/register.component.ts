import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { BackendService } from './../../services/backend.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './../../app.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string = ''
  passwd: string = ''
  confirmPasswd: string = ''

  usernameValid: boolean | null = null
  passwdValid: boolean | null = null
  confirmPasswdValid: boolean | null = null

  constructor(
    private backendService: BackendService,
    private router: Router,
  ) { }

  ngOnInit() { }

  async checkUsername(): Promise<boolean> {
    let res = true

    if (this.username.length < 3)
      res = false

    const userExists = await firstValueFrom(this.backendService.userExists(this.username))
    if (userExists)
      res = false

    this.usernameValid = res
    return res
  }

  checkPasswd(): boolean {
    const res = this.passwd.length >= 8
    this.passwdValid = res
    return res
  }

  checkConfirmPasswd(): boolean {
    const res = (this.passwd == this.confirmPasswd)
    this.confirmPasswdValid = res
    return res
  }

  async sendRegister() {
    await this.checkUsername(); this.checkPasswd(); this.checkConfirmPasswd()
    const valid = this.usernameValid && this.passwdValid && this.confirmPasswdValid
    if (valid) {
      const res = await firstValueFrom(this.backendService.register(this.username, this.passwd))
      if (res)
        this.router.navigate(['/friends'])
    }
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }
}
