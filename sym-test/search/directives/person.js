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
