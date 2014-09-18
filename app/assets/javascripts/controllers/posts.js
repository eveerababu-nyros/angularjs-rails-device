function PostsCtrl($scope, Posts) {
	
    "use strict";
    $scope.posts = Posts.index();
}

function CommentAddCtrl($scope, $location, Comments, Comment, $routeParams) {
    "use strict";

		
    $scope.comment = {};
    $scope.comment.post_id = $routeParams.post_id;
    $scope.create = function(comment) {
        var commentService = new Comments(comment);
        commentService.$create(function(comment1) {
						$scope.test = "test done";
						console.log($scope.comments.length)
						$scope.comments.push(comment);

	
        });
						$scope.comments = Comments.index({
					id : $routeParams.post_id
				});
										$scope.comment = '';
    }
}

function PostShowCtrl($scope, $location, $routeParams, Post, Comments) {"use strict";
    $scope.mypost_id = "show"
	$scope.test = "test it";
    $scope.post = Post.show({
        post_id : $routeParams.post_id
    });
		$scope.comments = Comments.index({
			id : $routeParams.post_id
		});
			

    console.log($scope.comments)

		$scope.remove = function(id) {
        var title = 'Delete Post?', msg = 'Are you sure you want to delete this post?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

			 var result1 =	confirm(msg);
				if (result1 === true ) {
                Post.destroy({
                    post_id : id
                }, function() {
                    $location.path('/posts');
                });
            }

        
    };
    
    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };


}

function PostAddCtrl($scope, $location, Posts, Post) {
    "use strict";
    $scope.post = {};
    $scope.create = function(post) {
				//alert("success");
        var postService = new Posts(post);
				//alert("success1");
        postService.$create(function(post) {
						//alert("success2");
						$location.path('/posts');
        });
    }
}

function PostEditCtrl($scope, $routeParams, $location, Post) {
    "use strict";
    
    $scope.master = {};
    var post_id = $routeParams.post_id;
    $scope.post = Post.show({
        post_id : post_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(post) {
        post.$update({
            post_id : post_id
        }, function(updatedPost) {
            $location.path('/posts/' + updatedPost.id);
        });
    }
}


