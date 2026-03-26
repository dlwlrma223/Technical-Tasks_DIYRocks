1. No Loading Logo 

No logo loadedProblem: There is no loading logo let user know  user list is being fetched.
The user see "No users found" during the loading period, which is misleading.

fix: Added a Spain loading logo .set it to true during fetch, and show a loading logo in the html.

2. UserDashboardService and UserDashboardController run at the same time.

In UserDashboardService, after calling the GET API and before getting response.data, UserDashboardController already calls searchUsers in the Service. So the user array is still empty, and the HTML shows "No users found".

fix: Controller all event must be after get user list. Put all events inside UserDashboardService.getUserList.then to make sure the user data is already getUserList before any action.

3. UserDashboardService updateUser function api get and put run at the same time. but JS is not asynchronous.
The get API will get the old user list data.

fix: let set .then make sure the user data is updated -> get user list 

4. The API path is duplicated in UserDashboardService.

This will cause problems In the future because if the URL is changed, we need to update it in many places.

fix: Set the API URL as a variable API_URL. This helps avoid human error and makes sure we don’t miss any part when updating the URL later.

5. After makeAdmin, the page does not update.

It does not search again, because filteredUsers is not updated.
$scope.filteredUsers and users inside UserDashboardService are two different arrays.

fix: After updateUser is done, UserDashboardController must call searchUsers again.
Also added || "" to make sure it is safe and not undefined.

6. searchUsers does not change the query toLowercase.
In the if condition, users[i].name.toLowerCase() changed the user name from the DB to lowercase.
For example, 'TONy' or 'TONY' becomes 'tony'.

So the search query entered by the user should also be changed to lowercase to keep it consistent.

fix: Convert the query from the controller to lowercase before searching.

7. removed getUsers and getUser function 
In this project, there is no place that uses the getUsers and getUser functions.
Removed them to keep the code clean.

8. Use track by user.id in ng-repeat.
When data changes, only the updated user will re-render. This makes the frontend loading speed faster.

9. All $http functions should throw errors.

When calling an API, it may fail.
The error log inside the service is for developers to debug.
The controller should catch the error from the service and show it on the frontend to tell the user the action failed.

Fix:
In the service, throw errors in GET and PUT API calls for developers to see.
In the controller, catch the API errors and pass them to the frontend.
In the HTML, add a <div> to display the error message.