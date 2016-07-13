var app = angular.module("chommiesApp", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'FeedCtrl',
		templateUrl: 'templates/props.html'
	});

	$routeProvider.when('/myProps', {
		controller: 'MyPropsCtrl',
		templateUrl: 'templates/myProps.html'
	})
});

app.controller('FeedCtrl', function($scope, $http) {
	$scope.errorMsg = false;

	$scope.loadProps = function() {
		$http({
			url: "http://ixchommies.herokuapp.com/props",
			method: "GET",
			params: {
				token: "9002ce1ee31dd343dd5cf8f567e3ba85"
			}
		}).then(function(response) {
			$scope.props = response.data;
		});
	}

	$scope.loadProps();

	$http({
		url: "http://ixchommies.herokuapp.com/brus",
		method: "GET",
		params: {
			token: "9002ce1ee31dd343dd5cf8f567e3ba85"
		}
	}).then(function(response) {
		$scope.brus = response.data;
	});

	$scope.sendProps = function() {
		$scope.errorMsg = false;
		console.log($scope.newPropsValue)
		console.log($scope.selectedBru)

		if ($scope.newPropsValue === "") {
			$scope.errorMsg = true;
			$scope.warning = "Oops! Don't forget to add props.";
		} else if ($scope.selectedBru === undefined) {
			$scope.errorMsg = true;
			$scope.warning = "Please select a bru to send props to.";
		} else {
			$http({
			    method: "GET",
			    url: "https://twinword-sentiment-analysis.p.mashape.com/analyze/",
			    headers: { 'X-Mashape-Key': "CjiIwKWCwkmshdrP5qLRpdtog6I4p1hxHNQjsnVV6mVaKT9EBr" },
			    params: { 'text': $scope.newPropsValue}
			}).then(function(response) {
				if (response.data.score > .05) {
					$http({
						url: "http://ixchommies.herokuapp.com/props",
						method: "POST",
						params: {
							token: "9002ce1ee31dd343dd5cf8f567e3ba85"
						},
						data: {
							for: $scope.selectedBru.id,
							props: $scope.newPropsValue
						}
					}).then(function(response) {
						$scope.props.unshift(response.data);
						$scope.selectedBru = "";
						$scope.newPropsValue = "";
					});
				} else {
					$scope.errorMsg = true;
					$scope.warning = "Make your props more positive!";
					$scope.newPropsValue = "";
				}
			});
		}
	}
});

app.controller('MyPropsCtrl', function($scope, $http) {
	$http({
		url: "http://ixchommies.herokuapp.com/props/me",
		method: "GET",
		params: {
			token: "9002ce1ee31dd343dd5cf8f567e3ba85"
		}
	}).then(function(response) {
		$scope.myProps = response.data;
	});
});
