angular.module('projectsService', ['ngResource'])
  .factory('Projects', function($resource) {
    return $resource('projects.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' }
    });
  })
  .factory('Project', function($resource){
    return $resource('projects/:project_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });




