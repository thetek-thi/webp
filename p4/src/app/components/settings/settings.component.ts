import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Profile } from 'src/app/models/Profile'
import { BackendService } from './../../services/backend.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', './../../app.component.css'],
})
export class SettingsComponent implements OnInit {
  firstName: any = ''
  lastName: any = ''
  coffeeOrTea: any = 'neither_nor'
  sthAboutYou: any = ''
  layout: any = ''

  constructor(
    private backendService: BackendService,
    private router: Router,
  ) { }

  ngOnInit() { }

  send() {
    const profile = new Profile(this.firstName, this.lastName, this.coffeeOrTea, this.sthAboutYou, this.layout)
    this.backendService.saveCurrentUserProfile(profile)
    this.router.navigate(['/friends'])
  }
}
