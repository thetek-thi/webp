import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BackendService } from './../../services/backend.service'
import { Profile } from './../../models/Profile'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../app.component.css'],
})
export class ProfileComponent implements OnInit {
  user = ''
  profile = new Profile('Loading...', '', 'Loading...', 'Loading...', '')

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = params['username']

      this.backendService.loadUser(this.user).subscribe(u => {
        if (u) {
          const usefulUser = JSON.parse(JSON.stringify(u)) // the model files are not acually models of the sent data. thanks for nothing, <insert lecturer name here>.
          const desc = usefulUser['description'] ?? 'User did not set a description yet.'
          const firstName = usefulUser['firstName'] ?? this.user
          const lastName = usefulUser['lastName'] ?? ''
          const coffeeOrTeaRaw = usefulUser['coffeeOrTea']
          let coffeeOrTea = 'User did not set a preference yet'
          if (coffeeOrTeaRaw === '0') coffeeOrTea = "Neither nor"
          else if (coffeeOrTeaRaw === '1') coffeeOrTea ="Coffee"
          else if (coffeeOrTeaRaw === '2') coffeeOrTea = 'Tea' 
          const layout = usefulUser['layout'] ?? 'idkwhattoputhere'
          this.profile = new Profile(firstName, lastName, coffeeOrTea, desc, layout)
        }
      })
    })
  }

  backToChat() {
    history.back()
  }
}
