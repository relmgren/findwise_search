angular
  .module('mainApp')
  .factory('peopleFactory', function($http, $q, $jsonpCallbacks) {
    var url = 'http://search.i3demo.findwise.com/rest/apps/demo/searchers/programming_assinment';
    return {
      get: function(search, offset, hitsperpage, callback) {
        var defer = $q.defer();
        var query = "?offset=" + offset + "&hits=" + hitsperpage + "&q=" +search;
        var request = url + query;

        $http.defaults.jsonCallbackParam = callback;
        $http({
          method: 'JSONP',
          url: request,
          params: {
            format: 'jsonp'
          }
        })
        .then(function(data) {
          if (data.status == 200) {
            defer.resolve(data);
          } else {
            defer.reject("Bad request, status " + data.status);
          }
        }, function(data, status) {
          defer.reject(data, status);
        })
        return defer.promise;

        // $http.jsonp(url + query, {jsonpCallbackParam: callback})
        //   .then(function (data) {
        //     if (data.status == 200) {
        //       console.log(data);
        //       defer.resolve(data);
        //     } else {
        //       defer.reject("Bad request! Status: " + data.status, data.status);
        //     }
        //   }, function(data, status) {
        //     defer.reject(data, status);
        //   });
        //   return defer.promise;
      }
  };
})
