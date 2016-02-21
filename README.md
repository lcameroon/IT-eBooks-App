# IT-eBooks-App usinf Angular Material-Start (ES6)

This branch implements the application using JSPM and ES6. 

### ES6 with JSPM

These application use jspm.io: package manager for SystemJS which is built on top of the dynamic ES6 module loader. This allows developers to load any module format (ES6, CommonJS, AMD, and globals).

After you have cloned the repository, you should execute the following commands:

* `npm install jspm -g`
* `jspm install`


Since web application uses **jspm** with Angular-Material:

* In the HTML, we only load the **System loader** and the configuration module
> Notice no stylesheets are loaded here... they are injected later upon demand
* Configure the system loader to laod the app/boot module.
