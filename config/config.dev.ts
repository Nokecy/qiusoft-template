import { defineConfig } from 'umi';
import { project } from './project';
import routes from './routers';

export default defineConfig({
	define: {
		OAUTH_ClientID: project.oauth.clientId,
		OAUTH_ClientSecret: project.oauth.clientSecret,
		OAUTH_Scope: project.oauth.scope,
	},
	routes: routes,
});
