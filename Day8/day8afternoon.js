var app = angular.module('groceryApp', []);

app.controller('GroceryCtrl', function($scope) {
	$scope.tasks = [];
	$scope.searchText = "";

	// If item is already in list, updates the quantity and returns true, else returns false.
	var updateList = function(name, quantity) {
		for (var i = 0; i < $scope.tasks.length; i++) {
			if ($scope.tasks[i].name === name) {
				$scope.tasks[i].quantity += parseInt(quantity);
				return true;
			};
		};
		return false;
	};

	$scope.addToList = function() {
		if (!updateList($scope.name, $scope.quantity)) {
			$scope.tasks.push({
				'name': $scope.name,
				'quantity': parseInt($scope.quantity)
			});
		}
		$scope.name = "";
		$scope.quantity = "";
	};

	$scope.increment = function(obj) {
		obj.quantity++;
	};

	$scope.decrement = function(obj) {
		obj.quantity--;
	};
});