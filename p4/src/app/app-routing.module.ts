import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatComponent } from './components/chat/chat.component'
import { FriendsComponent } from './components/friends/friends.component'
import { LoginComponent } from './components/login/login.component'
import { LogoutComponent } from './components/logout/logout.component'
import { ProfileComponent } from './components/profile/profile.component'
import { RegisterComponent } from './components/register/register.component'
import { SettingsComponent } from './components/settings/settings.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',             component: LoginComponent    },
  { path: 'logout',            component: LogoutComponent   },
  { path: 'register',          component: RegisterComponent },
  { path: 'profile/:username', component: ProfileComponent  },
  { path: 'settings',          component: SettingsComponent },
  { path: 'chat/:username',    component: ChatComponent     },
  { path: 'friends',           component: FriendsComponent  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
