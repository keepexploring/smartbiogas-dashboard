# SmartBiogas Dashboard

## Minimum Requirements

To run the project Node 8.9 or higher needs to be installed.

## How to build and run

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

To install [Angular CLI](https://github.com/angular/angular-cli) run

`npm install -g @angular/cli`

or

`yarn global add @angular/cli`

## Install dependencies

Run `npm install` or `yarn` on the root folder.

## Running the project

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Notes

- For maps we are using [angular-google-maps](https://github.com/SebastianM/angular-google-maps) (MIT)

### General Notes

- All http requests are in the `app/services` folder.

#### Auth

- Auth is based on a Bearer token call to the back-end.
- The auth headers get added on the `TokenInterceptor`
- There are guards that check if the user is logged in, then if the token expired or the user in unauthorised (Http code 401), the interceptor redirects to the login component

## TODO / Known Issues

- Angular Google Maps uses an outdated version of RxJs
- SIMPLIFY DEDUPLICATE: `(...arrs) => [ ...new Set( [].concat(...arrs) ) ];`
