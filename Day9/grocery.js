var app = angular.module('groceryApp', []);

app.controller('GroceryCtrl', function($scope) {
	$scope.tasks = [];
	$scope.searchText = "";

	// If item is already in list, updates the quantity and returns true, else returns false.
	var updateList = function(name, quantity) {
		for (var i = 0; i < $scope.tasks.length; i++) {
			if ($scope.tasks[i].name.toLowerCase() === name.toLowerCase()) {
				$scope.tasks[i].quantity += parseInt(quantity);
				return true;
			};
		};
		return false;
	};

	$scope.addToList = function() {
		if (!isNaN($scope.name)) {
			alert("Food Name may only contain letters");
		} else if (isNaN($scope.quantity)) {
			alert("Quantity may only contain numbers");
		} else if (!updateList($scope.name, $scope.quantity)) {
			$scope.tasks.push({
				'name': $scope.name,
				'quantity': parseInt($scope.quantity)
			});
		};
		$scope.name = "";
		$scope.quantity = "";
	};

	$scope.deleteList = function() {
		$scope.tasks = [];
	};

	$scope.increment = function(obj) {
		obj.quantity++;
	};

	$scope.delete = function(index) {
		$scope.tasks.splice(index, 1);
	};

	$scope.decrement = function(obj) {
		var index = $scope.tasks.indexof(obj);
		if (obj.quantity - 1 < 0) {
			$scope.delete(index);
		} else {
			obj.quantity--;
		};
	};
});