// Load the custom app ES6 modules

import BooksController from 'books/BooksController'
import BooksService    from 'books/BooksDataservice'

import { ExternalLogger } from 'utils/LogDecorator';

let $log = new ExternalLogger();
    $log = $log.getInstance( "BOOTSTRAP" );
    $log.debug( "Configuring 'books' module" );

// Define the Angular 'books' module

let moduleName = angular
      .module( "books", [ ] )
      .service("booksService", BooksService )
      .controller("BooksController", BooksController )
      .name;

export default moduleName;
