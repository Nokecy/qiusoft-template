import { defineConfig } from 'umi';
import routes from './routers';

export default defineConfig({
	define: {
		OAUTH_ClientID: 'WMS_App',
		OAUTH_ClientSecret: '1q2w3e*',
		OAUTH_Scope: 'offline_access',

		OidcConfigName: 'dev',
		enableOidc: false,
	},
	routes: routes,
});
