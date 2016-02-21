/**
* Main App Controller for the Angular Material Starter App
* @param $scope
* @param booksService
* @constructor
*/
function BooksController( booksService, $log ) {

    $log = $log.getInstance( "SessionController" );
    $log.debug("instanceOf() ");

    var self = this;

    self.books = [];
    self.term = booksService.getInitialTerm();
    self.searchBookByTerm = searchBookByTerm;
    self.loadMoreBooks = loadMoreBooks;
    self.getBooksByPage = getBooksByPage;
    self.moreInfo = moreInfo;
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
        $log.debug("loadMoreBooks() " );
        if (self.nextPage <= Math.round(self.totalOfPages / 10)) {
            self.getBooksByPage(self.nextPage);
        }
        return;
    }

    /**
    * Load More Books (go to next page)
    */
    function moreInfo(id) {
        console.log(id);
    }
}

export default [
    'booksService', '$log',
    BooksController
];
