import { Component } from '@angular/core';
import { HeaderComponent } from './app/header/header.component';
import { FooterComponent } from './app/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { ProfileComponent } from './app/profile/profile.component';
import { Database, ref, set, get, child } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './styles.css']
})
export class AppComponent {
  constructor(private db: Database) {
    this.escribirDato();
    this.leerDato();
  }
  escribirDato() {
    set(ref(this.db, 'usuarios/1'), {
      nombre: 'Pedro',
      edad: 30
    });
  }

  leerDato() {
    const dbRef = ref(this.db);
    get(child(dbRef, 'usuarios/1')).then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data');
      }
    }).catch(error => {
      console.error(error);
    });
  }
  
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
