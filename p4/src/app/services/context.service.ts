import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ContextService {
  public loggedInUsername = ''
  public currentChatUsername = ''

  constructor() {
    console.log('*** context created ***')
  }
}
