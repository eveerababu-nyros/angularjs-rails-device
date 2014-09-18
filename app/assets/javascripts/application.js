// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require suggest.min
//= require angular
//= require ui-bootstrap-tpls-0.11.0.min 
//= require angular-resource
//= require bootstrap.min
//= require angular-strap.min
//= require services/postsService
//= require services/commentsService
//= require services/recordService
//= require services/sessionService
//= require services/projectsService
//= require services/tasksService
//= require controllers/posts
//= require controllers/comments
//= require controllers/projects
//= require controllers/app
//= require controllers/users
//= require controllers/record
//= require angular-will-paginate


angular.module('PostCommentRails', ['postsService', 'commentsService', 'projectsService', 'tasksService', 'ui.bootstrap', 'sessionService','recordService','$strap.directives'])
  .config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path('/users/login');
                    return response;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        provider.responseInterceptors.push(interceptor);
  }])
  .config(['$routeProvider', function(router){
    router
      .when('/', {templateUrl:'/home/index.html'})
      .when('/record', {templateUrl:'/record/index.html', controller:RecordCtrl})
      .when('/users/login', {templateUrl:'/users/login.html', controller:UsersCtrl})
      .when('/users/register', {templateUrl:'/users/register.html', controller:UsersCtrl})	
      .when('/posts', {templateUrl:'/posts/index.html', controller:PostsCtrl})
      .when('/posts/add', {templateUrl:'/posts/add.html', controller: PostAddCtrl})
      .when('/posts/:post_id', {templateUrl:'/posts/show.html', controller:PostShowCtrl})
      .when('/posts/:post_id/edit', {templateUrl:'/posts/edit.html', controller: PostEditCtrl})
      .when('/projects', {templateUrl:'/projects/index.html', controller: ProjectsCtrl})
			.when('/projects/add', {templateUrl:'/projects/add.html', controller: ProjectAddCtrl})
			.when('/projects/:project_id', {templateUrl:'/projects/show.html', controller: ProjectShowCtrl})
			.when('/projects/:project_id/edit', {templateUrl:'/projects/edit.html', controller: ProjectEditCtrl})
			.when('/tasks/add', {templateUrl:'/tasks/add.html', controller: TaskAddCtrl})
      .otherwise({redirectTo: '/'});
}]);


