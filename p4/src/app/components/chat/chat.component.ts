import { Component, OnInit } from '@angular/core'
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { User } from './../../models/User'
import { Message } from './../../models/Message'
import { BackendService } from './../../services/backend.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css', './../../app.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatview') private chatview: ElementRef
  messages: Message[] | null = null

  constructor(
    private backendService: BackendService,
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
    this.backendService.sendMessage('bar', 'bli bla blub').subscribe(ok => {
      this.loadMessages()
    })
  }

  loadMessages() {
    this.backendService.listMessages('bar').subscribe(messages => {
      this.messages = messages
    })
  }

  ngOnInit() {
    this.scrollToBottom()
    this.backendService.loadCurrentUser().subscribe(user => {
      if (user === null) {
        this.backendService.login('foo', '12345678').subscribe(ok => {
          if (ok)
            this.loadMessages()
          else
            console.log('failed to login')
        })
      } else
        this.loadMessages()
    })
  }
}
