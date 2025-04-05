import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BlogRecipesListComponent } from '../blog-recipes-list/blog-recipes-list.component';

@Component({
  selector: 'app-index',
  imports: [HeaderComponent, FooterComponent, BlogRecipesListComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css', '../../styles.css']
})
export class IndexComponent {

}
