import { Component } from '@angular/core';
import { HeaderComponent } from './app/header/header.component';
import { FooterComponent } from './app/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { ProfileComponent } from './app/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './styles.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  setLogin(logged: boolean) {
    console.log('Estado de login cambiado a:', logged);
    this.isLoggedIn = logged;
  }
  onActivate(event: any) {
    if (event instanceof LoginComponent || event instanceof ProfileComponent) {
      event.loginEvent.subscribe((logged: boolean) => {
        this.setLogin(logged);
      });
    }
  }
}
