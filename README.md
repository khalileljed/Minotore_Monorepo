# Widgets monorepo

A single repository, also known as The Monorepo is a workspace that manages micro-frontend applications, front-end libraries and tools.

Micro-frontends are custom, reusable, encapsulated HTML tags to use in web pages and web apps known as _Web Components_. We are using _Angular Elements_ which are Angular components packaged as _custom elements_.
For more details you can check [Web components](https://www.webcomponents.org/introduction) & [Angular elements](https://angular.io/guide/elements).

This project was generated using [Nx](https://nx.dev) & [AngularCLI](<[https://angular.io/](https://angular.io/)>).

> This is an overview of the Monorepo. Note that each exportable library within this repository contains its own `README.md` file.

## Up & Running

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You must have `NodeJS` & `npm` to be able to run this project, you can simply install [nodejs](https://nodejs.org/en/) and it will be packaged with `npm`.

You must have `@angular/cli` and `@nrwl/schematics` globaly in your system.

```
npm install -g @angular/cli
npm install -g @nrwl/schematics (optional)
```

### Installing project dependencies

We are using a private hosted npm proxy registry, Verdaccio (currently on http://10.10.4.182:4873/), to publish our core libraries. unsing `npm install` directly will results in errors because npm won't find the private libraries, so you must run the configurations script under `package.json` to enable diffrent profiles; for `@minotore`/`@minotoreproject` & other dependencies.

Run `init registries` & `npm install` to install all dependencies.

```
npm run init:registries (requires user credentials from Verdaccio)
npm install
```

## Quick start

> This guide assumes that you are familiar with npm & Angular.

Besides `Angular cli` & `Nrwl` tools, this repository uses a sets of tools; custom schematics, webpack configuration, widget-lifecycle scripts etc... to develop Micro-frontends Angular-based applications based on a predefined design.

All the schematics and tools are in @minotore/schematics & @minotore/wx, those two libraries provides simultaneously a sets of tools; custom schematics, widget-lifecycle scripts etc, to develop Micro-frontends Angular-based applications based on a predefined design.

> NOTE: This is a quick start so we won't be digging into details about the implementation or the design, you can find that in the documentation.

### Generating widgets

Just like generating Angular applications and libraries, you can use the `Angular CLI` to generate widgets using the `widget` schemtic provided by `@minotore/schematics`.

```
ng generate widget <optional> [widget-name]
ng g wid // same command
```

Here is a list of all the options and scenarios with `ng generate widget`

| options | Rule                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| appOnly | True by default. If set to false, besides the app, a publishable widget library would be generated                 |
| mwidget | True by default. If set to false, the needed files and configs for a widget to be an CMS mwidget wont be generated |

Here are the diffrent properties used by the schematic

| props    | Rule                                                                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | Widget's name, if appOnly is set to FALSE, the profix 'widget' would be added to the app name, as the entred arg would be used as a lib name |
| selector | The selector to be used to define the Custom Element to the browser, the selector should contain a dash ('-') and must be in lowercase       |

The widget schematic will create an application and a publishable library (if specified in options). You must provide a name for the library.

```
? What name would you like to use for the component library? my-component
```

Basicly every production widget should be a publishable library if you are working on minotore-widgets repository.

```
? Would you like to create a publishable component? yes (default)
```

You must provide a valid widget name ( Tag ). Custom element tag names require a **dash (-)** ; they can't be single words and they must not contain an uppercase character. _By default_ the widget's tag is `custom-widget` but you should change that:

```
? What name ( HTML tag ) would you like to use for the widget? (custom-widget) my-widget-name
```

### Serving widgets

You must be able to serve your widgets as if they are regular Angular application.

```
ng serve [widget-application-name]
```

> Depending on the requirements, some widgets (also called CMS widgets) require _bridge-widget_, which is a widget that serves configurations to all available widgets in a given HTML page. In that case you would not be able to test/run your applications succesfuly using `ng serve`. (more details on **why** in the documentation)

Another way to serve and test your application is to use a http server and serve the widget under _elements/_ folder.
Note that you should build your application to create the needed js file to be served.

### Building widgets - application & library

- **Application**

Just like regular Angular applications, widget applications is built with `ng build` however we've changed the default builder from default Angular to `ngx-build-plus` and we added some options to the build command. So in order to build your widget use the `wx:create` from _package.json_.

```
npm run wx:create [widget-application-name] [options]
```

> The `wx:create` script will build the application under _/dist_, bundle _main.js_ and _script.js_ into a single file and then copy it under _/elements/[widget-application-name]_/mwidget/js/[widget-application-name].js <-- _this is the final artifact file_.

> When building a single widget you should update the version. Use the option `-- --update=version*` (version\* are in the following table)

| Version | Rule                                                        |
| ------- | ----------------------------------------------------------- |
| MAJOR   | when you make incompatible API changes                      |
| MINOR   | when you add functionality in a backwards compatible manner |
| PATCH   | when you make backwards compatible bug fixes                |

- **Library**

To build the library you can use `ng build`. You can find the build artifact under _/dist/libs_.

```
ng build [lib-name]
```
