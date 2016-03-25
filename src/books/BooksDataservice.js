const API_URL = "//it-ebooks-api.info/v1";
/**
* Books DataService
*
* @returns {{
*    searchBookByTerm: Function,
*    getBookDetails: Function,
*    getInitialTerm: String
* }}
* @constructor
*/
function BooksDataservice($q, $http, $log) {

    function searchBookByTerm(term, page) {
        $log.debug("searchBookByTerm()");

        return $http.get(API_URL + "/search/"+ term +"/page/"+ page)
        .then(success)
        .catch(fail);
    }

    function getBookDetails(id) {
        $log.debug("getBookDetails()");

        return $http.get(API_URL+ "/book/"+ id)
        .then(success)
        .catch(fail);
    }

    function getInitialTerm() {
        var lang = ["Java", "PHP", "JavaScript",
                    "Python", "Objective-C", "Ruby",
                    "Perl", "Node", "SQL", "Swift"];
        return lang[Math.floor( Math.random() * lang.length )];
    }

    function success(response) {
        return response.data;
    }

    function fail(e) {
        return exception.catcher("XHR Failed")(e);
    }

    $log = $log.getInstance( "BooksDataservice" );
    $log.debug( "instanceOf() ");

    // Promise-based API
    return {
        searchBookByTerm : searchBookByTerm,
        getBookDetails   : getBookDetails,
        getInitialTerm   : getInitialTerm,
        selectedBookId   : null,
    };
}

export default [
    "$q", "$http", "$log",
    BooksDataservice
];
