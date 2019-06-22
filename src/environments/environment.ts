// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//used to connect app with firebase
export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDxDld_j91uxu5YPUkqZOTXMpPNPxX-1hQ",
    authDomain: "tomsproductsdatabase-abc1e.firebaseapp.com",
    databaseURL: "https://tomsproductsdatabase-abc1e.firebaseio.com",
    projectId: "tomsproductsdatabase-abc1e",
    storageBucket: "tomsproductsdatabase-abc1e.appspot.com",
    messagingSenderId: "200918744237"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
