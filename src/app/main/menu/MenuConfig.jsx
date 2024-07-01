import i18next from 'i18next';
import { lazy } from 'react';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'menuPage', en);
i18next.addResourceBundle('tr', 'menuPage', tr);
i18next.addResourceBundle('ar', 'menuPage', ar);
const Menu = lazy(() => import('./Menu'));
/**
 * The Menu page config.
 */
const MenuConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'menu',
			element: <Menu />
		}
	]
};
export default MenuConfig;
