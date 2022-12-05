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
    const valid = (await this.checkUsername()) && this.checkPasswd() && this.checkConfirmPasswd()
    if (valid) {
      const res = await firstValueFrom(this.backendService.register(this.username, this.passwd))
      if (res)
        this.router.navigate(['/friends'])
    }
  }

/** from old js code: **/
//function checkColor() {
    //let color: string = Document.getElementById("username").style.borderColor
    ////console.log(color)
    //let result = false;
    //if (color === "green") {
        //result = true;
    //}
    //else {
        //result = false;
    //}
    //return result;
//}
//function checkUserExistence() {
    //var username = document.register.username.value;
    //var xmlhttp = new XMLHttpRequest();

    //xmlhttp.onreadystatechange = function () {
        //if (xmlhttp.readyState == 4) {
            //if (xmlhttp.status == 204) {
                //console.log("Exists");
                //document.getElementById("username").style.borderColor = "red";
                //document.getElementById("username").style.borderWidth = "3px";
            //} else if (xmlhttp.status == 404) {
                //if (username.length < 3) {
                    //document.getElementById("username").style.borderColor = "red";
                    //document.getElementById("username").style.borderWidth = "3px";
                //} else {
                    //document.getElementById("username").style.borderColor = "green";
                    //document.getElementById("username").style.borderWidth = "3px";
                //}
                //console.log("Does not exist");
            //}
        //}
        ////console.log(xmlhttp.status);
    //};

    //xmlhttp.open("GET", "https://online-lectures-cs.thi.de/chat/" + window.chatCollectionId + "/user/" + username, true);
    //// console.log("https://online-lectures-cs.thi.de/chat/" + window.chatCollectionId +"/user/" + username);
    //// console.log(xmlhttp);
    //xmlhttp.send();
//}

//function checkPassword() {
    //var password = document.register.password.value;
    //let status = false;
    //if (password.length < 8) {
        ////alert("Passwortlänge muss mindestens 8 Zeichen betragen.");
        //document.getElementById("password").style.borderColor = "red";
        //document.getElementById("password").style.borderWidth = "3px";
    //} else {
        //document.getElementById("password").style.borderWidth = "3px";
        //document.getElementById("password").style.borderColor = "green";
        //status = true;
    //}
    //return status;
//}
//function checkConfirm() {
    //var confirmPassword = document.register.confirmPassword.value;
    //let status = false;
    //password = document.register.password.value;
    //if (password !== confirmPassword) {
        ////alert("Die Passwörter stimmen nicht überein!");
        //document.getElementById("confirmPassword").style.borderWidth = "3px";
        //document.getElementById("confirmPassword").style.borderColor = "red";
    //} else {
        //document.getElementById("confirmPassword").style.borderColor = "green";
        //document.getElementById("confirmPassword").style.borderWidth = "3px";
        //status = true;
    //}
    //return status;
//}

//function submission() {
    //let status = false;

    //checkUserExistence()
    //if (checkPassword() && checkColor() && checkConfirm()) {
        //status = true;
    //}
    //else {
        //alert("Es sind noch Eingaben ungültig")
    //}
    //return status;
//}


}
