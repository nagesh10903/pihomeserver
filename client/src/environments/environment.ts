// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // apiUrl: 'http://192.168.0.111/Api',
//  cmdUrl: 'http://192.168.0.111/cmd',
 // authUrl: 'http://192.168.0.111/api',
  apiUrl: 'http://192.168.0.201:3000/Api',
  cmdUrl: 'http://192.168.0.201:3000/cmd',
  authUrl: 'http://192.168.0.201:3000/api',
  aurthType: 'LOCAL',
  intranetIP: '192.168.0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
