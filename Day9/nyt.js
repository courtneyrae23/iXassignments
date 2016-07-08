var app = angular.module('nytApp', []);

app.controller('NYTCtrl', function($scope, $http) {

	var API_KEY = 'f4b185b7033249fab395e20248d10afe';

	$scope.searchFor = function() {
		$http({
			url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
			method: 'GET',
			params: {
				'api-key': API_KEY,
				'q': $scope.searchText
			}
		}).then(function(nyt_response) {
			console.log(nyt_response);
			$scope.articles = nyt_response.data.response.docs;
		});
	}

});
