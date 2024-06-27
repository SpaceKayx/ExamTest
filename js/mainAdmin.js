app.controller("mainAdmin", function ($scope, $http, $window, $rootScope) {
    $scope.check = true;
    console.log($rootScope.isAdmin);
    // console.log($rootScope.isLogin);
    var valueCheck;
    $scope.loadData = function () {
        $http.get("http://localhost:3000/List_In_Main")
            .then(res => {
                $scope.list_Match = res.data
            })
    }
    $scope.loadData()

    $scope.loadSlogan = () => {
        $http.get("http://localhost:3000/Slogan")
            .then(res => {
                $scope.slogan = res.data[0]
            })
    }
    $scope.loadSlogan()
    $scope.edit_Slogan = () => {
        $scope.check = !$scope.check;
        if($scope.check){
            $http.patch("http://localhost:3000/Slogan/1", $scope.slogan).then((res) => {
                console.log(1)
            })
        }
            
        // }
    }
    $scope.ChangeSlogan = () =>
    {
        var sloganNew = document.getElementById('fillAgainValue').children[0]
                var backToSlogan = document.createElement('h4')
                backToSlogan.setAttribute('id', "update_slogan")
                backToSlogan.setAttribute('ng-repeat', "slogan in Slogan_load")
                $scope.loadSlogan()
                sloganNew.parentNode.replaceChild(backToSlogan, sloganNew)
    }
})