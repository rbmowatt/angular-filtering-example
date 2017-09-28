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


// here we define our unique filter
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