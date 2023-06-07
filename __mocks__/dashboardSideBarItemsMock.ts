import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import WarningIcon from '@mui/icons-material/Warning';
import TableViewIcon from '@mui/icons-material/TableView';
import { INavItemConfig } from '../src/components/NavItem/types';

/**
 * mock file defining test sidebar nav menu items
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 */
const dashboardSideBarItemsMock: Array<Partial<INavItemConfig>> = [
  {
    title: 'general',
  },
  {
    title: 'home',
    path: '/',
    icon: HomeIcon,
  },
  {
    title: 'my account',
    path: '/dashboard/account',
    icon: AccountCircleIcon,
  },
  {
    title: 'Configurators',
  },
  {
    title: 'Cost Configurator',
    path: '/dashboard/costs-config',
    icon: MonetizationOnIcon,
  },
  {
    title: 'Tables',
  },
  {
    title: 'Table 1',
    path: '/dashboard/db-table-1',
    icon: TableViewIcon,
  },
  {
    title: 'Table 2',
    path: '/dashboard/db-table-2',
    icon: TableViewIcon,
  },
  {
    title: 'Table 3',
    path: '/dashboard/db-table-3',
    icon: TableViewIcon,
  },
  {
    title: 'Table 4',
    path: '/dashboard/db-table-4',
    icon: TableViewIcon,
  },
  {
    title: 'News',
  },
  {
    title: 'team news',
    icon: AnnouncementIcon,
    children: [
      {
        title: 'injuries',
        path: '/dashboard/team-news/injuries',
        icon: WarningIcon,
      },
    ],
  },
];

export default dashboardSideBarItemsMock;
