function CommentsCtrl($scope, $routeParams, Comments) {
    "use strict";
    $scope.comments = Comments.index();
}

function CommentShowCtrl($scope, $location, $routeParams, Comment) {"use strict";
    $scope.comment = Comment.show({
        comment_post_id : $routeParams.post_id
    });

    
}



function CommentEditCtrl($scope, $routeParams, $location, Comment) {
    "use strict";
    
    $scope.master = {};
    var comment_id = $routeParams.comment_id;
    $scope.comment = Comment.show({
        comment_id : comment_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(comment) {
        comment.$update({
            comment_id : comment_id
        }, function(updatedComment) {
            $location.path('/post/' + updatedComment.id);
        });
    }
}

