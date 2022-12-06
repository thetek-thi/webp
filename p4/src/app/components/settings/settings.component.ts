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

  ngOnInit() {
    this.backendService.loadCurrentUser().subscribe(u => {
      if (u) {
        const usefulUser = JSON.parse(JSON.stringify(u)) // the model files are not acually models of the sent data. thanks for nothing, <insert lecturer name here>.
        this.sthAboutYou = usefulUser['description'] ?? ''
        this.firstName = usefulUser['firstName'] ?? u.username
        this.lastName = usefulUser['lastName'] ?? ''
        this.coffeeOrTea = usefulUser['coffeOrTea'] ?? '0'
        this.layout = usefulUser['layout'] ?? 'one_line'
      }
    })
  }

  send() {
    const profile = new Profile(this.firstName, this.lastName, this.coffeeOrTea, this.sthAboutYou, this.layout)
    this.backendService.saveCurrentUserProfile(profile).subscribe(_ => {
      this.router.navigate(['/friends'])
    })
  }
}
