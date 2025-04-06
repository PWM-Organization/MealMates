import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../styles.css']
})
export class ProfileComponent {
  @Output() loginEvent = new EventEmitter<boolean>();

  logout() {
    this.loginEvent.emit(false);
  }
}
