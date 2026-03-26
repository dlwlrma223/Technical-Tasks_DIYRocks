angular.module("app").factory("UserDashboardService", function ($http) {
  var API_URL = "https://api.example.com/users";
  var users = [];
  var getUserList = $http.get(API_URL).then(function (response) {
    users = response.data;
  }).catch(function (error) {
    console.error("UserDashboardService.getUserList Failed to fetch users:", error);
    users = []; 
    throw error;
  });
  return {
    getUserList: getUserList,
    updateUser: function (id, changes) {
      return $http.put(API_URL + "/" + id, changes).then(function () {
        return $http.get(API_URL);
      }).then(function (response) {
        users = response.data;
      }).catch(function (error) {
        console.error("UserDashboardService.updateUser Failed:", error);
        throw error; 
      });;
    },
    searchUsers: function (query) {
      query = query.toLowerCase();
      var results = [];
      for (var i = 0; i < users.length; i++) {
        if (
          users[i].name.toLowerCase().indexOf(query) !== -1 ||
          users[i].email.toLowerCase().indexOf(query) !== -1
        ) {
          results.push(users[i]);
        }
      }
      return results;
    },
  };
});
