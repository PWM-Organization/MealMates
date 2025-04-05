import { bootstrapApplication } from '@angular/platform-browser';
import { IndexComponent } from './app/index/index.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(IndexComponent, config);

export default bootstrap;
