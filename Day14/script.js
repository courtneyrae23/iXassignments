var app = angular.module("tensionApp", ["firebase", "ngRoute"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}]);

app.config(function($routeProvider) {
	$routeProvider.when('/channels', {
		controller: 'ChannelsCtrl',
		templateUrl: 'templates/channels.html',
		resolve: {
	      // controller will not be loaded until $requireSignIn resolves
	      // Auth refers to our $firebaseAuth wrapper in the example above
	      "currentAuth": ["Auth", function(Auth) {
	        // $requireSignIn returns a promise so the resolve waits for it to complete
	        // If the promise is rejected, it will throw a $stateChangeError (see above)
	        return Auth.$requireSignIn();
	      }]
	    }
	});

	$routeProvider.when('/channel/:channelID', {
		controller: 'MessagesCtrl',
		templateUrl: 'templates/messages.html'
	});

	$routeProvider.when('/', {
		controller: 'LoginCtrl',
		templateUrl: 'templates/login.html'
	});

	$routeProvider.when('/signup', {
		controller: 'SignUpCtrl',
		templateUrl: 'templates/signup.html'
	});
});

app.controller('ChannelsCtrl', function($scope, $firebaseAuth, $firebaseObject, $firebaseArray) {
	
	var ref = firebase.database().ref().child('channels');
	$scope.channels = $firebaseArray(ref);

	$scope.signUserOut = function () {
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  window.location = "/";
		}, function(error) {
		  // An error happened.
		  console.log(error);
		});
	};

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

app.controller('SignUpCtrl', function($scope, $firebaseAuth, $routeParams, $firebaseObject, $firebaseArray) {
    $scope.authObj = $firebaseAuth();
 
	$scope.signUp = function() {
		console.log($scope.name);
		console.log($scope.email);
		console.log($scope.password);

		$scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password)
	  	.then(function(firebaseUser) {
	    console.log("User " + firebaseUser.uid + " created successfully!");

	    var userRef = firebase.database().ref().child('users').child(firebaseUser.uid);
	    $scope.user = $firebaseObject(userRef);
	    $scope.user.name = $scope.name;
	    $scope.user.email = $scope.email;
	    $scope.user.password = $scope.password;
	    $scope.user.$save();

	    window.location = "#/channels";

	  }).catch(function(error) {
	    console.error("Error: ", error);
	    document.getElementById("errorMsg").innerHTML = error.message;
	  });
	}
});

app.controller("LoginCtrl", function($scope, $firebaseAuth, $routeParams, $firebaseObject, $firebaseArray) {
    $scope.authObj = $firebaseAuth();

    $scope.login = function() {
    	$scope.error = false;
	    $scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
		  	console.log("Signed in as:", firebaseUser.uid);

			var userRef = firebase.database().ref().child('users').child(firebaseUser.uid);
		    $scope.user = $firebaseObject(userRef);
		    console.log($scope.user);
		    console.log($scope.user.name);

		    window.location = "#/channels";

		    console.log("I make it here");
			console.log($scope.authObj);
			console.log(firebase.auth());

		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		  document.getElementById("logInErrorMsg").innerHTML = error.message;
		});
	}
});