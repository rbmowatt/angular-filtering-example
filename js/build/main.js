var app=angular.module("symTestApp",["ngResource"]);app.filter("unique",function(){return function(e,n){var r=[],t=[];return angular.forEach(e,function(e){var a=e[n];-1===t.indexOf(a)&&(t.push(a),r.push(e))}),r}}),app.filter("getOrgObjects",function(){return function(e){var n=[];return angular.forEach(e,function(e){var r={organization_name:e.organization_name,location:e.location};n.push(r)}),n}}),app.factory("Data",["$resource",function(e){return e("/js/data.json")}]),app.controller("searchController",["$scope","$filter","Data",function(e,n,r){e.allPeeps=[],e.allOrgs=[],e.people=[],e.orgs=[],e.searchTerm="",e.error=!1,e.hidden=!1,e.toggle=function(){e.hidden=!1===e.hidden},r.query().$promise.then(function(r){e.allPeeps=e.people=n("orderBy")(r,"person_name"),e.allOrgs=n("orderBy")(r,"organization_name")},function(n){e.error="Uh-oh! There's been an error!"}),e.$watch("searchTerm",function(){e.people=n("filter")(e.allPeeps,e.searchTerm)}),e.$watch("people",function(){var r=n("filter")(e.allOrgs,e.searchTerm);e.orgs=n("unique")(r,"organization_name")})}]),app.directive("stBadge",function(){return{restrict:"C",template:'<button type="button" class="btn btn-xs btn-{{getClass()}}">{{initials()}}</button>',replace:!1,scope:{name:"=",index:"="},link:function(e){e.initials=function(){return names=e.name.split(" "),1===names.length?names[0][0]+"&nbsp;":names.length>1?names[0][0]+names[names.length-1][0]:"&nbsp;&nbsp;"},e.getClass=function(){var n=["primary","success","info","warning"];return n[e.index%n.length]}}}}),app.directive("stOrg",function(){return{restrict:"A",templateUrl:"sym-test/search/templates/directives/org.htm",replace:!0,scope:{org:"=",index:"="}}}),app.directive("stPerson",function(){return{restrict:"A",templateUrl:"sym-test/search/templates/directives/person.htm",replace:!0,scope:{person:"=",index:"="}}});