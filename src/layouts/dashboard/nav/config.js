// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Clients',
    path: '/dashboard/client',
    icon: icon('ic_client'),
    role: 'clients',
  },
  {
    title: 'Orders',
    path: '/dashboard/order',
    icon: icon('ic_pickup'),
    role: 'orders',
  },
  {
    title: 'Items',
    path: '/dashboard/item',
    icon: icon('ic_livreur'),
    role: 'items',
  },
];

export default navConfig;
