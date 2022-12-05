import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../app.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params['username']
      // TODO
    })
  }
}
