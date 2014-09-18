angular.module('commentsService', ['ngResource'])
  .factory('Comments', function($resource) {
    return $resource('comments.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' }
    });
  })
  .factory('Comment', function($resource){
    return $resource('comments/:comment_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
