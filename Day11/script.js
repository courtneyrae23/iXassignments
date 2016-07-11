var app = angular.module('movieApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: "MovieCtrl",
		templateUrl: "templates/movies-list.html"
	});

	$routeProvider.when('/movie/:movieID', {
		controller: "DetailCtrl",
		templateUrl: "templates/movie-details.html"
	});
});

app.controller("MovieCtrl", function($scope, $http) {
	$scope.movieSearch = function() {
		$http({
			url: "http://www.omdbapi.com/?",
			method: "GET",
			params: {
				s: $scope.searchText
			}
		}).then(function(response) {
			$scope.movieArray = response.data.Search;
		});
	};
});

app.controller("DetailCtrl", function($scope, $http, $routeParams) {
	$http({
		url: "http://www.omdbapi.com/?",
		method: "GET",
		params: {
			i: $routeParams.movieID
		}
	}).then(function(response) {
		console.log(response);
		$scope.movie = response.data;
		getGIFs();
	});

	var getGIFs = function() {
		$http({
			url: "http://api.giphy.com/v1/gifs/search",
			method: "GET",
			params: {
				limit: 10,
				q: $scope.movie.Title,
				rating: $scope.movie.Rated,
				api_key: "dc6zaTOxFJmzC"
			}
		}).then(function(response) {
			console.log(response)
			$scope.gifArray = response.data.data;
		})
	};
});