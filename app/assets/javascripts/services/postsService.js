angular.module('postsService', ['ngResource'])
  .factory('Posts', function($resource) {
    return $resource('posts.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' }
    });
  })
  .factory('Post', function($resource){
    return $resource('posts/:post_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });




