function ProjectsCtrl($scope, Projects) {
	 "use strict";
    $scope.projects = Projects.index();
		$scope.$parent.proj = 1;

}

function ProjectAddCtrl($scope, $location, Projects, Project) {
    "use strict";
    $scope.project = {};
    $scope.create = function(project) {
        var projectService = new Projects(project);
        projectService.$create(function(project) {
						$location.path('/projects');
        });
    }
}

function ProjectShowCtrl($scope, $location, $routeParams, Project, Tasks) {"use strict";
    $scope.project = Project.show({
        project_id : $routeParams.project_id
    });
		
    $scope.tasks = Tasks.index({
				id : $routeParams.project_id
		});
    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };
}

function ProjectRemoveCtrl($scope, $location, $routeParams, Project) { "use strict";
	$scope.remove = function(id) {
      var msg = 'Are you sure you want to delete this project?';
		  var result1 =	confirm(msg);
				if (result1 === true ) {
                Project.destroy({
                    project_id : id
                }, function() {
                    $location.path('/projects');
                });
            }
    };
}

function ProjectEditCtrl($scope, $routeParams, $location, Project) {
    "use strict";
    
    $scope.master = {};
    var project_id = $routeParams.project_id;
    $scope.project = Project.show({
        project_id : project_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(project) {
        project.$update({
            project_id : project_id
        }, function(updatedProject) {
            $location.path('/projects/' + updatedProject.id);
        });
    }
}

/* Tasks Controller Action */
function TaskAddCtrl($scope, $location, Tasks, Task, $routeParams, Projects) {
    "use strict";
		$scope.projects = Projects.index();
    $scope.task = {};
		//$scope.task.project_id = $routeParams.project_id;
    $scope.create = function(task) {
        var taskService = new Tasks(task);
        taskService.$create(function(task) {
				$location.path('/projects');
        });
    }
}
