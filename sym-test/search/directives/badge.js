app.directive('stBadge',function ()
{
    return {
        restrict:'C',
        template:'<button type="button" class="btn btn-sm btn-{{getClass()}}">{{initials()}}</button>',
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
