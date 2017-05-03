angular
  .module("mainApp")
  .controller('mainController', function($scope, peopleFactory) {
    //to avoid using $scope
    var vm = this;
    vm.resultsPerPage = 9;
    vm.currentPage = 0;
    vm.peopleList;
    vm.searchStats;
    vm.paging;

    vm.loading = false;
    vm.pagingArray = [];
    vm.sortOptions = [
      {value: 'name.asc', name: 'Name ASC'},
      {value: 'name.desc', name: 'Name DSC'},
      {value: 'name.score', name: 'Relevance'}
    ];
    vm.sortOption = {value: 'name.score', name: 'Relevance'};

    //functions
    vm.searchClick = searchClick;
    vm.sortChange = function() {
      vm.searchClick();
    }

    function searchClick(page = 0) {
      console.log(page);

      vm.peopleList = {};
      vm.searchStats = {};
      vm.pagingArray = [];
      vm.loading = true;
      //peopleFactory returns a promise
      if (page != 0) {
        peopleFactory.getFromQuery(page.query)
          .then(successCallback, badCallback)
          .finally(afterCallbacks)
      } else {
        peopleFactory.get(vm.search, vm.resultsPerPage, vm.sortOption.value)
          .then(successCallback, badCallback)
          .finally(afterCallbacks)
      }
    }

    function successCallback(res) {
      vm.peopleList = res.data.documentList.documents;
      vm.searchStats = res.data.stats;
      vm.paging = res.data.documentList.pagination;
      vm.sortOptions = res.data.documentList.sortOptions;
    }

    function badCallback(err, status) {
      console.log("server responded with status: " + status + "error");
      console.log(err);
    }

    function afterCallbacks() {
      vm.loading = false;
    }

    // If we want every entry to check in database uncomment this.
    // $scope.$watch('vm', function () {
    //   vm.seachClick(page);
    // }, true);
})
