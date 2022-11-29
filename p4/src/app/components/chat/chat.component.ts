import { Component, OnInit } from '@angular/core'
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  // DIV für Nachrichten (s. Template) als Kind-Element für Aufrufe (s. scrollToBottom()) nutzen
  @ViewChild('messagesDiv') private myScrollContainer: ElementRef

  constructor() {
    this.myScrollContainer = new ElementRef(null)
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  /**
   * Setzt in der Nachrichtenliste die Scrollposition ("scrollTop") auf die DIV-Größe ("scrollHeight"). Dies bewirkt ein
   * Scrollen ans Ende.
   */
  scrollToBottom() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
    } catch (err) { }
  }

  ngOnInit() {
    this.scrollToBottom()
  }
}
