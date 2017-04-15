angular
  .module("mainApp")
  .controller('mainController', function($scope, peopleFactory) {
    //to avoid using $scope
    var vm = this;
    vm.resultsPerPage = 10;
    vm.currentPage = 0;
    vm.peopleList;
    vm.searchStats;
    vm.loading = false;
    vm.pagingArray = [];

    vm.searchClick = function(page = 0) {
      vm.currentPage = 0;
      console.log(page);

      if (typeof page === 'object') {
        page = page.i;
        console.log(page);
        vm.currentPage = page;
      }
      vm.peopleList = {};
      vm.searchStats = {};
      vm.pagingArray = [];
      vm.loading = true;
      //peopleFactory returns a promise
      peopleFactory.get(vm.search, page, 10, 'show')
        .then(function(res) {
          //successful request
          vm.peopleList = res.data.documentList.documents;
          vm.searchStats = res.data.stats;
          vm.pagingArray = vm.createPagingButtons();
        }, function(err, status) {
          //error request
          console.log("server responded with status: " + status + "error");
          console.log(err);
        })
        .finally(function() {
          vm.loading = false;
        //  vm.show();
        })
    }

    vm.show = function() {
      console.log(vm.peopleList);
    }

    //Creates an array that we can ng-Repeat over to create buttons with containing values.
    vm.createPagingButtons = function() {
      var numOfPageButtons = parseInt(vm.searchStats.totalHits / vm.resultsPerPage);
      var i = 0;
      var resultArray = [];

      if(numOfPageButtons == 0) {
        return resultArray;
      } else if (numOfPageButtons > 10) {

        if (vm.currentPage < 5) {
          while (i < 10) {
            resultArray[i] = i;
            i++;
          }
          //We want currentPage to be the middle-st button in a range of 10.
        } else if (vm.currentPage >= 5 && numOfPageButtons >= (vm.currentPage + 5)) {
          while (i < 10) {
            resultArray[i] = (vm.currentPage - 5) + i;
            i++;
          }
        } else {
          while (i < 10) {
            resultArray[9 - i] = numOfPageButtons - i;
            i++;
          }
        }
      } else {
        while (i < numOfPageButtons) {
          resultArray[i] = i;
          i++;
        }
      }
      console.log(resultArray);
      return resultArray;
    }

    // If we want every entry to check in database uncomment this.
    // $scope.$watch('vm', function () {
    //   vm.seachClick(page);
    // }, true);
})
