import BookDetailsController from 'books/BookDetailsController'

/**
* Main App Controller for the Angular Material Starter App
* @param $scope
* @param booksService, $scope, $log, $mdDialog, $mdMedia
* @constructor
*/
function BooksController( booksService, $scope, $log, $mdDialog, $mdMedia ) {

    $log = $log.getInstance('SessionController');
    $log.debug('instanceOf() ');

    var self = this;

    self.books = [];
    self.term = booksService.getInitialTerm();
    self.searchBookByTerm = searchBookByTerm;
    self.loadMoreBooks = loadMoreBooks;
    self.getBooksByPage = getBooksByPage;
    self.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    self.bookDetailsDialog = bookDetailsDialog;
    self.nextPage = 1;
    self.totalOfPages = null;
    self.loading = false;

    // Load all registered books

    getBooksByPage(self.nextPage);

    // *********************************
    // Internal methods
    // *********************************

    /**
    * Search book by term
    * @param term
    * @return Promise
    */
    function searchBookByTerm(term) {
        return self.getBooksByPage(0).then(function (data) {
            $log.debug("searchBookByTerm('"+ self.term +"') ", self.term);
        });
    }

    /**
    * Get books by page
    * @param page
    * @return Promise
    */
    function getBooksByPage(page) {
        self.loading = true;
        return booksService
            .searchBookByTerm(self.term, page)
            .then( function( data ) {
                self.loading = false;
                self.books = (page === 0) ? [].concat(data.Books) : self.books.concat(data.Books);
                self.totalOfPages = parseInt(data.Total);
                self.nextPage = page + 1;
                $log.debug("getBooksByPage('"+ self.term +"') ", self.term);
            }
        );
    }

    /**
    * Load More Books (go to next page)
    */
    function loadMoreBooks() {
        $log.debug('loadMoreBooks()');
        if (self.nextPage <= Math.round(self.totalOfPages / 10)) {
            self.getBooksByPage(self.nextPage);
        }
        return;
    }

    /**
    * Open Book Details Dialog
    */
    function bookDetailsDialog(ev, id) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && self.customFullscreen;
        $mdDialog.show({
            controller: BookDetailsController,
            templateUrl: 'src/books/view/bookDetails.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });
        booksService.selectedBookId = id

    }
}

export default [
    'booksService', '$scope', '$log', '$mdDialog', '$mdMedia',
    BooksController
];
