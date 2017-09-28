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
            //set up a class variable to be applied
            this.class= null;
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
                    //there was nothing there, rather than throw an error we'll just put two spaces to keep everything looking the same
                    return '&nbsp;&nbsp;';
                }
            };

            scope.getClass=function (){
                //wasnt sure here if i was supposed to make them reset each time or be sticky to a person
                //made them sticky, but could just remove the check for this.class to make them refresh
                if(this.class){
                    return this.class;
                }
                var btns=['primary','success','info','warning'];
                this.class =  btns[scope.index%btns.length];
                return this.class;
            };
        }
    };
});
