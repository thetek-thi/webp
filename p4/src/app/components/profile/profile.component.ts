import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BackendService } from './../../services/backend.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../app.component.css'],
})
export class ProfileComponent implements OnInit {
  user = ''

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = params['username']
    })
  }
}
