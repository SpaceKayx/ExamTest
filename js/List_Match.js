
app.controller("list_Match_Controller", function($scope, $http, $rootScope){
    $scope.loadData = function()
    {
        $http.get("http://localhost:3000/List_In_ListMatch")
        .then(res=>
            {
                $scope.list_Match = res.data
            })
    }
    $scope.loadData()
    $rootScope.IDQuestion = (id) =>
    {
        console.log(id);
        $rootScope.ID = id
    }
    $rootScope.IDQuestion()
    
})