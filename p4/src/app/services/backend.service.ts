import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Friend } from '../models/Friend'
import { Message } from '../models/Message'
import { Profile } from '../models/Profile'
import { User } from '../models/User'
import { ContextService } from './context.service'

@Injectable({ providedIn: 'root' })
export class BackendService {
  private baseUrl = 'https://online-lectures-cs.thi.de/chat/'
  private serverId = '7290151c-8682-452f-a07c-66ee53340f77'
  private restServerUrl = this.baseUrl + this.serverId + '/'
  private headers: any // header for token

  constructor(
    private httpClient: HttpClient,
    private context: ContextService,
  ) { }

  login(username: string, password: string): Observable<boolean> {
    const body = { username, password }
    const observable = new Observable<boolean>(subscriber => {
      const serverCall = this.httpClient.post(this.restServerUrl + 'login', body)
      serverCall.subscribe({
        next: token => {
          this.setUser(username, token)
          subscriber.next(true) // yield result to caller of login()
        },
        error: err => {
          console.log('login error: ' + err)
          subscriber.next(false) // yield result to caller of login()
        },
      })
    })

    return observable
  }

  register(username: string, password: string): Observable<boolean> {
    const body = { username, password }
    const observable = new Observable<boolean>(subscriber => {
      const serverCall = this.httpClient.post(this.restServerUrl + 'register', body)
      serverCall.subscribe({
        next: token => {
          this.setUser(username, token);
          subscriber.next(true); // yield result to caller of register()
        },
        error: err => {
          console.log('login error: ' + err);
          subscriber.next(false); // yield result to caller of register()
        },
      })
    })

    return observable
  }

  public userExists(username: string): Observable<boolean> {
    const observable = new Observable<boolean>(subscriber => {
      const serverCall = this.httpClient.get(this.restServerUrl + 'user/' + username)
      serverCall.subscribe({
        next: _ => subscriber.next(true), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next(false) // yield result to caller
        },
      })
    })

    return observable
  }

  loadCurrentUser(): Observable<User | null> {
    return this.loadUser(this.context.loggedInUsername)
  }

  loadUser(username: string): Observable<User | null> {
    const observable = new Observable<User | null>(subscriber => {
      const serverCall = this.httpClient.get(this.restServerUrl + 'user/' + username, this.headers)
      serverCall.subscribe({
        next: (buffer: any) => subscriber.next(buffer as User), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next(null) // yield result to caller
        },
      })
    })

    return observable
  }

  loadFriends(): Observable<Friend[]> {
    const observable = new Observable<Friend[]>(subscriber => {
      const serverCall = this.httpClient.get(this.restServerUrl + 'friend', this.headers)
      serverCall.subscribe({
        next: (buffer: any) => subscriber.next(buffer as Friend[]), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next([]) // yield result to caller
        },
      })
    })

    return observable
  }

  listUsers(): Observable<string[]> {
    const observable = new Observable<string[]>(subscriber => {
      const serverCall = this.httpClient.get(this.restServerUrl + 'user', this.headers)
      serverCall.subscribe({
        next: (buffer: any) => subscriber.next(buffer as string[]), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next([]) // yield result to caller
        },
      })
    })

    return observable
  }

  saveCurrentUserProfile(profile: Profile): Observable<boolean> {
    const observable = new Observable<boolean>(subscriber => {
      const serverCall = this.httpClient.put(this.restServerUrl + 'user', profile, this.headers)
      serverCall.subscribe({
        next: _ => subscriber.next(true), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next(false) // yield result to caller
        },
      })
    })

    return observable
  }

  friendRequest(username: string): Observable<boolean> {
    const observable = new Observable<boolean>(subscriber => {
      const serverCall = this.httpClient.post(this.restServerUrl + 'friend', { username }, this.headers)
      serverCall.subscribe({
        next: _ => subscriber.next(true), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next(false) // yield result to caller
        },
      })
    })

    return observable
  }

  acceptFriendRequest(username: string): Observable<boolean> {
    return this.acceptOrDismissFriendRequest(username, 'accepted')
  }

  dismissFriendRequest(username: string): Observable<boolean> {
    return this.acceptOrDismissFriendRequest(username, 'dismissed')
  }

  private acceptOrDismissFriendRequest(username: string, status: string): Observable<boolean> {
    const observable = new Observable<boolean>(subscriber => {
      const serverCall = this.httpClient.put(this.restServerUrl + 'friend/' + username, { status }, this.headers)
      serverCall.subscribe({
        next: _ => subscriber.next(true), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next(false) // yield result to caller
        },
      })
    })

    return observable
  }

  removeFriend(username: string): Observable<boolean> {
    const observable = new Observable<boolean>(subscriber => {
      const serverCall = this.httpClient.delete(this.restServerUrl + 'friend/' + username, this.headers)
      serverCall.subscribe({
        next: _ => subscriber.next(true), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next(false) // yield result to caller
        },
      })
    })

    return observable
  }

  unreadMessageCounts(): Observable<Map<string, number>> {
    const observable = new Observable<Map<string, number>>(subscriber => {
      const serverCall = this.httpClient.get(this.restServerUrl + 'unread', this.headers)
      serverCall.subscribe({
        next: (result: any) => subscriber.next(result as Map<string, number>), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next(new Map<string, number>()) // yield result to caller
        },
      })
    })

    return observable
  }

  listMessages(otherUser: string): Observable<Message[]> {
    const observable = new Observable<Message[]>(subscriber => {
      const serverCall = this.httpClient.get(this.restServerUrl + 'message/' + otherUser, this.headers)
      serverCall.subscribe({
        next: (result: any) => subscriber.next(result as Message[]), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next([]) // yield result to caller
        },
      })
    })

    return observable
  }

  sendMessage(receiverUsername: string, msg: string): Observable<boolean> {
    const body = { message: msg, to: receiverUsername }
    const observable = new Observable<boolean>(subscriber => {
      const serverCall = this.httpClient.post(this.restServerUrl + 'message', body, this.headers)
      serverCall.subscribe({
        next: _ => subscriber.next(true), // yield result to caller
        error: err => {
          console.log('backend service error: ' + err)
          subscriber.next(false) // yield result to caller
        },
      })
    })

    return observable
  }

  /**
   * Store username and token (from login call) for further reference.
   * The token is embedded in a http header value.
   * @param username name of logged in user
   * @param token security token for subsequent calls
   */
  private setUser(username: string, token: any): void {
    this.context.loggedInUsername = username
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token.token)
    this.headers = { headers }
    console.log(`user ${username} - token: ${JSON.stringify(token)}`)
  }
}
