import { Component, inject } from '@angular/core';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule, 
        HeaderComponent, 
        FooterComponent, 
        RouterModule
    ],
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css', 
        './styles.css'
    ],
})
export class AppComponent {
    private authService = inject(AuthService);

    user$ = this.authService.authState$;
}
