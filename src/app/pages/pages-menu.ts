import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'E coumerce',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Web Apps ',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'WEB APPLICATION',
    group: true,
  },
  {
    title: 'WEB APPLICATION',
    icon: 'browser-outline',
    children: [
      {
        title: 'webapp details',
        link: '/pages/webclient/search',
      },
    ],
  },
  
];
