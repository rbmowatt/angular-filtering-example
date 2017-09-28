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