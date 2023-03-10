// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  firebase: {
    projectId: 'tgfinder-c5906',
    appId: '1:471791426269:web:e775b917869bc2cb439934',
    databaseURL: 'https://tgfinder-c5906-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'tgfinder-c5906.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAoCCijtMjamzjjVGEr5iJBz79ytY83ZtQ',
    authDomain: 'tgfinder-c5906.firebaseapp.com',
    messagingSenderId: '471791426269',
    measurementId: 'G-HEK3N9FJT5',
  },
  production: false
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
