angular.module('mainApp', [])
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    // We must whitelist the JSONP endpoint that we are using to show that we trust it
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://search.i3demo.findwise.com/**'
      //http://search.i3demo.findwise.com/rest/apps/demo/searchers/programming_assinment
    ]);
  }]);
