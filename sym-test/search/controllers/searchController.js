app.controller('searchController',['$scope','$filter','Data',function ($scope,$filter,Data){
        // well keep this here to represnt origina data so we dont lose it on filtering
        $scope.allPeeps=[];
        $scope.searchTerm='';

        //just some stuff to handle toggle functionaltiy
        $scope.hidden=false;
        $scope.toggle=function (){
            $scope.hidden=$scope.hidden===false?true:false;
        };
        //get the data resource, right now will just return a json object
        Data.query().$promise.then(
                function (res)
                {
                    $scope.people=$scope.allPeeps=res;

                },
                function (err)
                {
                    //obviously not the best error handling
                    alert('Uh-oh! There\'s been an error!');
                }
        );

        // filter the people for search term
        $scope.filter=function (term){
            $scope.searchTerm = term;
            $scope.people=$filter('filter')($scope.allPeeps,term);
        };

        //watch for changes to the people array and filter orgs accordingly
        $scope.$watch('people',function (){
            //first we'll filter it down to unique names and then create individual org objects to filter against
            //if we don't create specific org objects here then we'll be runnibg match against hings we dont want to match
            var orgs=$filter('unique')($filter('getOrgObjects')($scope.people),'organization_name');
            $scope.orgs=$filter('filter')(orgs,$scope.searchTerm);
        });
    }]);