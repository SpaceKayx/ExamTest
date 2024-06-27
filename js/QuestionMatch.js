function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
app.controller("QuestionMatch_Controller", function ($scope, $http, $rootScope) {
    $scope.check = false
    $scope.stopInterval
    $scope.loadData = function () {
        // console.log(randomNumbers);
        $http.get("http://localhost:3000/Question_Match")
            .then(res => {
                $scope.list_Question = res.data;
                shuffle($scope.list_Question)
                angular.forEach($scope.list_Question, (val, key) => {
                    shuffle(val.answers)
                });
            })
    }

    $scope.loadData()
    $scope.loadData_List = function () {
        $http.get("http://localhost:3000/List_In_ListMatch")
            .then(res => {
                $scope.list_Match = res.data
            })
    }
    $scope.loadData_List()
    $scope.checkQuizz = function (yourAnswer, realAnswer, quizzIndex) {
        if ($scope.yourAnswers === undefined) {
            $scope.yourAnswers = [];
        }
        $scope.yourAnswers[quizzIndex] =
        {
            yourAnswer: yourAnswer,
            realAnswer: realAnswer
        };
    }

    $scope.submitQuizz = function () {
        $scope.yourResults = angular.copy($scope.yourAnswers);
        clearInterval(countdownInterval);
    }
    console.log($rootScope.ID);
    $scope.checkBook = () => {
        $scope.check = true

        // Đặt thời gian bắt đầu và thời gian kết thúc (15 phút = 900 giây)
        var startTime = new Date().getTime();
        var endTime = startTime + (document.getElementById('countdown').innerText * 60 * 1000);

        // Cập nhật đồng hồ đếm ngược mỗi giây
        $scope.countDown = countdownInterval = setInterval(function () {
            // Lấy thời gian hiện tại
            var currentTime = new Date().getTime();

            // Tính toán thời gian còn lại
            var timeRemaining = endTime - currentTime;

            // Kiểm tra nếu đã đếm ngược đến 0 giây
            if (timeRemaining <= 0) {
                clearInterval($scope.countDown);
                $scope.submitQuizz();
            } else {
                // Chuyển đổi thời gian còn lại thành định dạng phút:giây
                var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                // Hiển thị thời gian còn lại
                document.getElementById("countdown").innerHTML = minutes + " phút " + seconds + " giây";
            }
        }, 1000); // Mỗi giây (1000 ms)
    }

})