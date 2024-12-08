import { Routes } from '@angular/router';
import { generateRoutes } from 'jokudevs-ionic-angular-dynamic-tabs';
import { APP_TABS } from './app-tabs.config';

export const routes: Routes = generateRoutes(APP_TABS);
