var app = angular.module("tensionApp", ["firebase", "ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'ChannelsCtrl',
		templateUrl: 'templates/channels.html'
	});

	$routeProvider.when('/channel/:channelID', {
		controller: 'MessagesCtrl',
		templateUrl: 'templates/messages.html'
	});
});

app.controller('ChannelsCtrl', function($scope, $firebaseObject, $firebaseArray) {
	var ref = firebase.database().ref().child('channels');
	$scope.channels = $firebaseArray(ref);
});

app.controller('MessagesCtrl', function($scope, $routeParams, $firebaseObject, $firebaseArray) {
	var channelID = $routeParams.channelID;
	var channelref = firebase.database().ref().child('channels').child(channelID);
	$scope.channelName = $firebaseObject(channelref);
	var ref = firebase.database().ref().child('messages').child($routeParams.channelID);
	$scope.messages = $firebaseArray(ref);

	$scope.addMessage = function() {
		$scope.messages.$add({
			sender: $scope.userName,
			text: $scope.messageText,
			created_at: Date.now()
		});

		$scope.messageText = "";
	};
});