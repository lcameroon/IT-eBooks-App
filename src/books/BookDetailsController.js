/**
* Main App Controller for the Angular Material Starter App
* @param $scope
* @param booksService
* @constructor
*/
function BookDetailsController( booksService, $scope, $log, $mdDialog ) {

    $log = $log.getInstance('SessionController');
    $log.debug('instanceOf() ');

    $scope.cancel = cancel;
    $scope.getBookDetails = getBookDetails;
    $scope.bookData = {};
    $scope.loading = false;

    // Load all registered books
    getBookDetails();

    // *********************************
    // Internal methods
    // *********************************

    /**
    * Get book by id
    * @param id
    * @return Promise
    */
    function getBookDetails() {
        var bookId = booksService.selectedBookId;
        $scope.loading = true;
        return booksService
            .getBookDetails(bookId)
            .then( function( data ) {
                $scope.loading = false;
                $scope.bookData = data;

                $log.debug("getBookDetails('"+ bookId +"') ", bookId);
            }
        );
    }

    function cancel() {
        $mdDialog.cancel();
    }
}

export default [
    'booksService', '$scope', '$log', '$mdDialog',
    BookDetailsController
];
