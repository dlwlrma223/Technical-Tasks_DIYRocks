angular
  .module("app")
  .controller(
    "UserDashboardController",
    function ($scope, UserDashboardService) {

      $scope.filteredUsers = [];
      $scope.error = "";
      
      UserDashboardService.getUserList
        .then(function () {
          $scope.filteredUsers = UserDashboardService.searchUsers("");

          $scope.onSearch = function () {
            var query = $scope.searchQuery;
            $scope.filteredUsers = UserDashboardService.searchUsers(
              query || "",
            );
          };

          $scope.makeAdmin = function (user) {
            $scope.error = "";
            UserDashboardService.updateUser(user.id, { role: "admin" })
              .then(function () {
                $scope.filteredUsers = UserDashboardService.searchUsers(
                  $scope.searchQuery || "",
                );
              })
              .catch(function () {
                $scope.error = "Update failed. Please try again.";
              });
          };
        })
        .catch(function () {
          $scope.error = "Failed to load users list.";
        });
    },
  );
