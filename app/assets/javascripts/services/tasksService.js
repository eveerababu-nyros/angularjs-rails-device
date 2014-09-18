angular.module('tasksService', ['ngResource'])
  .factory('Tasks', function($resource) {
    return $resource('tasks.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' }
    });
  })
  .factory('Task', function($resource){
    return $resource('tasks/:task_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });




