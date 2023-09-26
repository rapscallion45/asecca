import HomeIcon from '@mui/icons-material/Home';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TableViewIcon from '@mui/icons-material/TableView';
import { INavItemConfig } from '../NavItem/types';

/**
 * Dashboard Sidebar navigation menu item definitions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof DashboardSideBar
 *
 * @constant
 * @type {Array<Partial<INavItemConfig>>}
 */
const dashboardSideBarItems: Array<Partial<INavItemConfig>> = [
  {
    title: 'general',
  },
  {
    title: 'home',
    path: '/',
    icon: HomeIcon,
  },
  {
    title: 'kanban boards',
  },
  {
    title: 'Collections',
    path: '/dashboard/kanban/collection',
    icon: ViewKanbanIcon,
  },
  {
    title: 'Projects',
    path: '/dashboard/kanban/collection-projects',
    icon: ViewKanbanIcon,
  },
  {
    title: 'Configurators',
  },
  {
    title: 'Cost Configurator',
    path: '/dashboard/configurators/costs-config',
    icon: MonetizationOnIcon,
  },
  {
    title: 'Forms',
  },
  {
    title: 'Collection Form',
    path: '/dashboard/forms/collection-form',
    icon: ListAltIcon,
  },
  {
    title: 'Tables',
  },
  {
    title: 'Devices',
    path: '/dashboard/tables/devices',
    icon: TableViewIcon,
  },
  {
    title: 'Table 2',
    path: '/dashboard/tables/aggrid-page-2',
    icon: TableViewIcon,
  },
  {
    title: 'Table 3',
    path: '/dashboard/tables/aggrid-page-3',
    icon: TableViewIcon,
  },
  {
    title: 'Table 4',
    path: '/dashboard/tables/aggrid-page-4',
    icon: TableViewIcon,
  },
];

export default dashboardSideBarItems;
