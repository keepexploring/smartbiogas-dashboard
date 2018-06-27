// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://127.0.0.1:9000/',
  baseUrl: 'https://api.smartbiogas.org/',
  googleMapsApiKey: 'AIzaSyBv5hn1XUw0YSSJlML9RJpOPEMRtGwmHME',
  apClientId: '123456',
  apClientSecret: '123456',
  apiPageLimit: 100,
  defaultPaginationLimit: 15,
  apiPagesToPrefetch: 20,
};
