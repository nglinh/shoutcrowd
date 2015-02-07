
var myApp = angular.module("myApp", ["firebase"]);
myApp.controller('MyController', ['$scope', '$firebase',
    function($scope, $firebase) {
        alert('hello');
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
    }
]);