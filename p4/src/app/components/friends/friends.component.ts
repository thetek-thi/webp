import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BackendService } from './../../services/backend.service'
import { IntervalService } from './../../services/interval.service'
import { Friend } from './../../models/Friend'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css', './../../app.component.css'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  friends: Friend[] = []
  pendingFriendRequests: Friend[] = []
  addFriendName: string = ''
  friendCompletions: string[] = []

  constructor(
    private router: Router,
    private backendService: BackendService,
    private intervalService: IntervalService,
  ) { }

  ngOnInit() {
    this.intervalService.setInterval("FriendsComponent", () => this.updateFriends())
  }

  ngOnDestroy() {
    this.intervalService.clearIntervals()
  }

  updateFriends() {
    this.backendService.loadFriends().subscribe(f => { // get friends
      this.backendService.loadCurrentUser().subscribe(u => { // get current user
        for (const i in f) f[i].unreadMessages = 0 // prohibit flickering of unread message counts
        this.friends = f.filter(x => x.status == 'accepted') // friends
        this.pendingFriendRequests = f.filter(x => x.status != 'accepted') // friend requests
        for (let w of u?.friends ?? []) this.pendingFriendRequests.push(new Friend(w, 'pending', 0)) // friends requests from current user object
        this.backendService.unreadMessageCounts().subscribe(m => { // get messages
          const map = new Map(Object.entries(m)) // turn the map into an actual map - thanks, javascript
          map.forEach((v, k) => { // loop through values and keys from message counts
            for (const i in this.friends)
              if (this.friends[i].username === k)
                this.friends[i].unreadMessages = v // overwrite unread message count for matching user
          })
        })
      })
    })
  }

  acceptFriend(username: string) {
    this.backendService.acceptFriendRequest(username).subscribe(_ => {
      this.updateFriends()
    })
  }

  declineFriend(username: string) {
    this.backendService.dismissFriendRequest(username).subscribe(_ => {
      this.updateFriends()
    })
  }

  updateCompletions() {
    this.backendService.listUsers().subscribe(f => this.friendCompletions = f.filter(x => x.toLowerCase().startsWith(this.addFriendName.toLowerCase())))
  }

  addFriend() {
    this.backendService.friendRequest(this.addFriendName).subscribe()
  }
}
