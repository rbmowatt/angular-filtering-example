var app=angular.module('symTestApp',["ngResource"]);
app.filter('unique',function (){
    return function (orgs,property){
        var results=[];
        //we'll keep a list of proprty values we've already found
        //and ignore them if we find them again
        var properties=[];
        angular.forEach(orgs,function (item){
            var key=item[property];
            if(properties.indexOf(key)===-1){
                properties.push(key);
                results.push(item);
            }
        });
        return results;
    };
});

app.filter('getOrgObjects',function (){

    return function (collection){
        var results=[];
        angular.forEach(collection,function (item){
            var org={organization_name:item.organization_name, location:item.location};
            results.push(org);
        });
        return results;
    };
});
app.factory('Data',["$resource", function ($resource){
    return  $resource("/js/data.json");
}]);



app.controller('searchController',['$scope','$filter','Data',function ($scope,$filter,Data){
        // well keep this here to represnt original data so we dont lose it on filtering
        $scope.allPeeps=[];
        $scope.allOrgs=[];
        $scope.people=[];
        $scope.orgs=[];
        $scope.searchTerm='';
        $scope.error=false;

        //just some stuff to handle toggle functionaltiy
        $scope.hidden=false;
        $scope.toggle=function (){
            $scope.hidden=$scope.hidden===false?true:false;
        };
        //get the data resource, right now will just return a json object
        Data.query().$promise.then(
                function (res)
                {
                    $scope.allPeeps=$scope.people=$filter('orderBy')(res,'person_name');
                    //first we'll filter it down to unique names and then create individual org objects to filter against
                    //if we don't create specific org objects here then we'll be runnibg match against hings we dont want to match
                    $scope.allOrgs= $filter('orderBy')(res,'organization_name');
                },
                function (err)
                {
                    //obviously not the best error handling
                    $scope.error='Uh-oh! There\'s been an error!';
                }
        );

        //watch for changes to the people array and filter orgs accordingly
        $scope.$watch('searchTerm',function (){
            $scope.people=$filter('filter')($scope.allPeeps,$scope.searchTerm);

        });

        //watch for changes to the people array and filter orgs accordingly
        $scope.$watch('people',function (){
            var orgs=$filter('filter')($scope.allOrgs,$scope.searchTerm);
            $scope.orgs=$filter('unique')(orgs,'organization_name');
        });

    }]); 
app.directive('stBadge',function ()
{
    return {
        restrict:'C',
        template:'<button type="button" class="btn btn-{{getClass()}}">{{initials()}}</button>',
        replace:false,
        scope:{
            name:"=",
            index:'='
        },
        link:function (scope){
            //get the initials of the person or org
            scope.initials=function (){
                names=scope.name.split(' ');
                if(names.length===1)
                {
                    return names[0][0]+'&nbsp;';
                }else if(names.length>1)
                {
                    return names[0][0]+names[names.length -1 ][0];
                }else
                {
                    //there was nothing there, rather than throw an error we'll just put two spaces to keep everything looking
                    return '&nbsp;&nbsp;';
                }
            };

            scope.getClass=function (){
                //wasnt sure here if i was supposed to make them reset each time or be sticky to a person
                //didn't do it because i thought it would make them look weird if they weren't in a repetetive order
                var btns=['primary','success','info','warning'];
                return btns[scope.index%btns.length];
            };
        }
    };
});

app.directive('stOrg',function ()
{
    return {
        restrict:'A',
        templateUrl:'sym-test/search/templates/directives/org.htm',
        replace:true,
        scope:{
            org:"=",
            index:'='
        }
    };
});
app.directive('stPerson',function ()
{
    return {
        restrict:'A',
        templateUrl:'sym-test/search/templates/directives/person.htm',
        replace:true,
        scope:{
            person:"=",
            index:'='
        }
    };
});
