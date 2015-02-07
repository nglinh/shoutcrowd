var myApp = angular.module("myApp", ["firebase", "angularMoment"]);
myApp.controller('MyController', ['$scope', '$firebase',
    function($scope, $firebase) {
        //CREATE A FIREBASE REFERENCE
        var ref = new Firebase("https://firechat-fb.firebaseIO.com");

        // GET MESSAGES AS AN ARRAY
        $scope.messages = $firebase(ref).$asArray();

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