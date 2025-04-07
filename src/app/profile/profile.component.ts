import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../styles.css']
})
export class ProfileComponent {
  @Output() loginEvent = new EventEmitter<boolean>();
  activeView: string = 'profile';

  showView(view: string) {
    this.activeView = view;
  }

  logout() {
    this.loginEvent.emit(false);
  }
}
