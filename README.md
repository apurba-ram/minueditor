# Minieditor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Marx

Marx Editor was created in the memory of late Karl Heinrich Marx (1818 - 1883). 
This is a small tribute to honour his writings including the legendary book "The Communist Manifesto"


## Usage

Add the package as a dependency to your project using:

    npm i marx-editor

Add the module to your app.module imports:

   import { MarxEditorModule } from 'marx-editor';
    ...

    @NgModule({
        imports: [ MarxEditorModule ],
        ...
    })