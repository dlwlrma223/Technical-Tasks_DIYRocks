angular.module("eventApp", []).controller("EventController", function ($scope, $http, $interval) {
    $scope.events = [];

    $scope.loadEvents = function () {
        $scope.error = "";
        $scope.loading = true;

        $http.get("/events").then(function (response) {
            if (!angular.equals($scope.events, response.data.events)) {
                $scope.events = response.data.events;
                $scope.counts = response.data.counts;
            }
        }).catch(function (response) {
            $scope.error = response.data.error;
        }).finally(function () {
            $scope.loading = false;
        });
    };

    $scope.createEvent = function () {
        $scope.error = "";
        $scope.creating = true;
        $http.post("/events", $scope.newEvent).then(
            function () {
                $scope.newEvent = {};
                $scope.loadEvents();
        }).catch(function (response) {
            $scope.error = response.data.error;
        }).finally(function () {
            $scope.creating = false;
        });
    };

    $scope.loadEvents();

    var poll = $interval(function () {
        $scope.loadEvents();
    }, 5000);

    $scope.$on("$destroy", function () {
        $interval.cancel(poll);
    });
});
