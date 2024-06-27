import { GoogleClient } from '@adobe/helix-google-support';
import { OneDriveAuth } from "@adobe/helix-onedrive-support";

export class TestCachePlugin {

    constructor() {
    }

    async beforeCacheAccess(cacheContext) {
    }

    async afterCacheAccess(cacheContext) {
      if (cacheContext.cacheHasChanged) {
        console.log(cacheContext.tokenCache.serialize());
      }
    }

    async getPluginMetadata() {
      return {};
    }
}

(async () => {
  const [runtime, pwd, provider, clientId, clientSecret, redirectUri, code, odTenant]  = process.argv;
  const cachePlugin = new TestCachePlugin();
  if (provider === "google") {
    const gc = await new GoogleClient({
        clientId,
        clientSecret,
        redirectUri,
        cachePlugin,
        log: {info: (msg) => {}},
      }).init();
    await gc.getToken(code);
  } else if (provider === "onedrive") {
    const graphScopes = ['offline_access', 'Files.ReadWrite', 'Sites.ReadWrite.All'];
    const auth = new OneDriveAuth({
      clientId,
      clientSecret,
      tenant: odTenant,
      cachePlugin,
      scopes: graphScopes,
    });
    const tokenRequest = {
      code,
      redirectUri,
      scopes: graphScopes,
    };
    await auth.app.acquireTokenByCode(tokenRequest);
  } else {
    throw new Error(`Unknown provider ${provider}`);
  }
})()