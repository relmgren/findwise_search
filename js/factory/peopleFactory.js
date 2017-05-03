angular
  .module('mainApp')
  .factory('peopleFactory', function($http, $q) {
    //url should IRL be kept in a .dotenv file and gathered from there.
    var url = 'http://search.i3demo.findwise.com/rest/apps/demo/searchers/programming_assinment';
    return {
      get: function(search, hitsperpage, sort) {
        var query = "?hits=" + hitsperpage + "&q=" +search + "&sort=" + sort;
        var request = url + query;
        return sendRequest(request);
      },

      /*
      * cleans the input query from stuff we already have layed out for us
      * callback value is handled by angular
      * format is already specified in sendReqeust.
      */
      getFromQuery: function(query) {
        var string = String(query);

        var re1 = new RegExp(/(format\=jsonp\&)/);
        if (!query.startsWith("hits")) {
          string = string.replace(re1, "?");
        } else {
          string = string.replace(re1, "");
          string = "?" + string;
        }
        var re2 = new RegExp(/(\&callback\=angular\.callbacks\._)\d/);
        string = string.replace(re2, "");

        var request = url + string;
        return sendRequest(request);
      }
    };

    function sendRequest(request) {
      var defer = $q.defer();
      $http({
        method: 'JSONP',
        url: request,
        params: {
          format: 'jsonp'
        }
      })
      .then(function(data) {
        if (data.status == 200) {
          console.log(data);
          defer.resolve(data);
        } else {
          defer.reject("Bad request, status " + data.status);
        }
      }, function(data, status) {
        defer.reject(data, status);
      })
      return defer.promise;
    }
})
