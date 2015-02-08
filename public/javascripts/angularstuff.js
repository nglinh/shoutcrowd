var myApp = angular.module("myApp", ["firebase", "angularMoment"]);
myApp.controller('MyController', ['$scope', '$firebase',
    function($scope, $firebase) {
        var choicesRef = new Firebase("https://fbhack.firebaseio.com/choices");
        var choicesSync  = $firebase(choicesRef);
        var syncObject = choicesSync.$asObject();

        syncObject.$bindTo($scope, "choices");


        //CREATE A FIREBASE REFERENCE
        var messageRef = new Firebase("https://firechat-fb.firebaseIO.com");
        // GET MESSAGES AS AN ARRAY
        $scope.messages = $firebase(messageRef).$asArray();

        //ADD MESSAGE METHOD
        $scope.addMessage = function(e) {

            //LISTEN FOR RETURN KEY
            if (e.keyCode === 13 && $scope.msg) {
                //ALLOW CUSTOM OR ANONYMOUS USER NAMES
                var name = $scope.name || 'anonymous';

                //ADD TO FIREBASE
                $scope.messages.$add({
                    date: Firebase.ServerValue.TIMESTAMP,
                    from: name,
                    url: Math.floor((Math.random() * 10) + 1),
                    body: $scope.msg
                });

                //RESET MESSAGE
                $scope.msg = "";
            }
        }
    }
]);
