import { useEffect, useState } from 'react';

import { CONFIG } from 'src/config-global';
import { SvgColor } from 'src/components/svg-color';
import { paths } from 'src/routes/paths';

const icon = (name) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);
const ICONS = {
  dashboard: icon('ic-dashboard'),
  products: icon('ic-product'),
  vendors: icon('ic-kanban'),
  orders: icon('ic-order'),
  settings: icon('ic-lock'),
  stocks: icon('ic-job'),
  ledger: icon('ic-invoice'),
  logout: icon('ic-external'),
  account: icon('ic-tour'),
  analytics: icon('ic-analytics'),
  receivables: icon('ic-ecommerce'),
};

export const useNavData = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const handleRoleChange = () => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      setUserRole(userData?.user?.role || null);
    };

    window.addEventListener('storage', handleRoleChange);
    handleRoleChange(); // Initial fetch

    return () => {
      window.removeEventListener('storage', handleRoleChange);
    };
  }, []);

  const commonItems = [
    {
      subheader: 'Dashboard',
      items: [

        { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
      ],
    },

  ];




  const navData = [
    ...commonItems
  ];

  return navData;
};
