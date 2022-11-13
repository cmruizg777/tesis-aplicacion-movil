// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/',
  firebaseConfig : {
    apiKey: 'AIzaSyAJYp_nwwfabR4ENM7CGHQNJLoY3jI_39Q',
    authDomain: 'sai-ecaa.firebaseapp.com',
    databaseURL: 'https://sai-ecaa-default-rtdb.firebaseio.com',
    projectId: 'sai-ecaa',
    storageBucket: 'sai-ecaa.appspot.com',
    messagingSenderId: '464966457302',
    appId: '1:464966457302:web:30f0c717e66329216d7677'
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
