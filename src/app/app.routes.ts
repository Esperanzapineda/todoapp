import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';

export const routes: Routes = [
    {
        path: '', //si le dejamos el home la paian principal sera en blanco hasta q se escriba la ruta, si se deja vacio como esring se vera el home
        component: HomeComponent
    },

    {
        path: 'labs',
        component: LabsComponent
    }
];
