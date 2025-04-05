import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../styles.css']
})
export class HeaderComponent {
  @Input() isLogged: boolean = false;
  @Output() logoutEvent = new EventEmitter<boolean>();

  logout() {
    this.logoutEvent.emit(false);
  }
}
