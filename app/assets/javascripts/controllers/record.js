function RecordCtrl($scope, Session, Records) {"use strict";

    $scope.user = Session.requestCurrentUser();
    $scope.records = Records.index();
		$scope.logout = function() {
        Session.logout();
			$scope.$parent.proj = 0;
    };
}

