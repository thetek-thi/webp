import { Component, OnInit } from '@angular/core'
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Message } from './../../models/Message'
import { BackendService } from './../../services/backend.service'
import { IntervalService } from './../../services/interval.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css', './../../app.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatview') private chatview: ElementRef
  messages: Message[] | null = null
  user = ''
  message = ''
  loggedInUser= ''

  constructor(
    private backendService: BackendService,
    private intervalService: IntervalService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.chatview = new ElementRef(null)
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    try {
      this.chatview.nativeElement.scrollTop = this.chatview.nativeElement.scrollHeight
    } catch (err) { }
  }

  sendMessage() {
    this.backendService.sendMessage(this.user, this.message).subscribe(_ => {
      this.loadMessages()
    })
    this.message = ''
  }

  loadMessages() {
    this.backendService.listMessages(this.user).subscribe(messages => {
      this.messages = messages
      this.scrollToBottom()
    })
  }

  removeFriend() {
    this.backendService.removeFriend(this.user).subscribe(_ => {
      this.router.navigate(['/friends'])
    })
  }

  ngOnInit() {
    this.scrollToBottom()
    this.backendService.loadCurrentUser().subscribe(user => {
      this.loggedInUser = user?.username ?? ''
      this.loadMessages()
    })

    this.route.params.subscribe(params => {
      this.user = params['username']
    })

    this.intervalService.setInterval("ChatComponent", () => this.loadMessages())
  }
}
