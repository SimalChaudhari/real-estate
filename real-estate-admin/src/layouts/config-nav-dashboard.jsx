import { useEffect, useState } from 'react';

import { CONFIG } from 'src/config-global';
import { SvgColor } from 'src/components/svg-color';
import { paths } from 'src/routes/paths';

const icon = (name) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);
const ICONS = {
  dashboard: icon('ic-dashboard'),
  users: icon('ic-user'),
  property: icon('ic-product'),
  settings: icon('ic-lock'),
  logout: icon('ic-external'),
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
    {
      subheader: 'Managements',
      items: [

        { title: 'Users', path: paths.users.root, icon: ICONS.users },
        { title: 'Properties', path: paths.properties.root, icon: ICONS.property },
      ],
    },
    {
      subheader: 'Settings',
      items: [

        { title: 'profile', path: paths.settings.root, icon: ICONS.settings },
        { title: 'logout', path: paths.settings.root, icon: ICONS.logout },

      ],
    },

  ];




  const navData = [
    ...commonItems
  ];

  return navData;
};
