import { MenuItem } from '../models/nav-menu-item.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/admin',
          children: [
            { label: 'Overview', route: '/admin/dashboard' },
          ],
        },
      ],
    },
    {
      group: 'Entities',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Menu Items',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Orders',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Users',
          route: '/users',
        },
      ],
    },   {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Account Settings',
          route: '/settings',
        },
      ],
    },
  ];
}
