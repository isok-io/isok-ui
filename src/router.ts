import { Router } from '@vaadin/router';
import "./import";

const routes = [
  {
    path: '/',
    component: 'app-page',
    children: [
      {
        path: '',
        component: 'home-page',
      },
      {
        path: 'connection',
        component: 'connection-page',
      },
      {
        path: 'register',
        component: 'register-page',
      }
    ]
  }
];

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
