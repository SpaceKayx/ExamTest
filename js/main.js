app.controller("mainController", function ($scope, $http, $rootScope) {
    $scope.loadData = function () {
        $http.get("http://localhost:3000/List_In_Main")
            .then(res => {
                $scope.list_Match = res.data
            })
    }
    $scope.loadData()
})