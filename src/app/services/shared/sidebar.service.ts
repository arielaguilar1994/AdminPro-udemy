import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  Menu: any = [
    {
      titulo: "Principal",
      icono: "mdi mdi-gauge",
        subMenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'ProgresBar', url: '/progress'},
        { titulo: 'Promesas', url: '/promesas'},
        { titulo: 'Rxjs', url: '/rxjs'},
        { titulo: 'Graficas', url: '/graficas1'}
      ]
    }
  ];

  constructor() { }
}
