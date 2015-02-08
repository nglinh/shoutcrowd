
var myApp = angular.module("myApp", ["firebase"]);
myApp.controller('MyController', ['$scope', '$firebase',
    function($scope, $firebase) {

            //CREATE A FIREBASE REFERENCE
            var ref = new Firebase("https://firechat-fb.firebaseIO.com");

            // GET MESSAGES AS AN ARRAY
            $scope.messages = $firebase(ref).$asArray();

            //LISTEN FOR RETURN KEY
            if (e.keyCode === 13 && $scope.msg) {
                console.log('hello');
                //ALLOW CUSTOM OR ANONYMOUS USER NAMES
                var name = $scope.name || 'anonymous';

                //ADD TO FIREBASE
                $scope.messages.$add({
                    from: name,
                    body: $scope.msg
                });

                //RESET MESSAGE
                $scope.msg = "";
            }



            //CREATE A FIREBASE REFERENCE
            var ref2 = new Firebase("https://fbhack.firebaseio.com/choices");

            // GET MESSAGES AS AN ARRAY
            $scope.choices = $firebase(ref2).$asArray();


            console.log($scope.choices);


    }
]);