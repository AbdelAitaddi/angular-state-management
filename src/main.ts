import { bootstrapApplication } from '@angular/platform-browser';

// entry component
import AppComponent from './app/core/containers/app/app.component';

// app  config
import { config } from './app/app.config';

bootstrapApplication(AppComponent, config)
  .catch((err) => console.error(err));

