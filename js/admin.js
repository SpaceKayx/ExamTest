
app.controller("admin_Controller", function ($scope, $http) {
    $scope.checkDetail = false
    $scope.checkQuestion = false
    $scope.checkNew = false
    $scope.loadData = function () {
        $http.get("http://localhost:3000/List_In_ListMatch")
            .then(res => {
                $scope.List_In_ListMatch = res.data
            })
    }
    $scope.loadData()
    $scope.loadData_Question = function () {
        $http.get("http://localhost:3000/Question_Match")
            .then(res => {
                $scope.list_Question = res.data;
                // $scope.length_Question = $scope.list_Question.length
            })
    }
    
    $scope.loadData_users = function () {
        $http.get("http://localhost:3000/Account")
            .then(res => {
                $scope.users = res.data
            })
    }
    $scope.loadData_users()

    $scope.checkSentence = (id) =>
    {
        $scope.sentence_ID = id
        $scope.checkQuestion = true
        $scope.checkNew = false
    }
    $scope.viewAll = () =>
    {
        $scope.checkQuestion = false
        $scope.checkNew = false
    }
    $scope.viewDetail = (id) => {
        $scope.ID = id
        $scope.loadData_Question()
        $scope.checkDetail = true
    }
    $scope.New = () =>
    {
        if($scope.checkNew)
        {
            let newArr = {
                "id": parseInt($scope.list_Question.length+1),
                "question": $scope.newQuestion,
                "answerId": 1,
                "answers": [
                  {
                    "id": 1,
                    "text": $scope.QuestionA
                  },
                  {
                    "id": 2,
                    "text": $scope.QuestionB
                  },
                  {
                    "id": 3,
                    "text": $scope.QuestionC
                  },
                  {
                    "id": 4,
                    "text": $scope.QuestionD
                  }
                ]
              }
            $scope.list_Question.push(newArr)
            $http.post("http://localhost:3000/Question_Match/", newArr)
            
        }
        $scope.checkNew = true
        $scope.checkQuestion = false
    }
    $scope.Delete = (id) =>
    {
        // đang error xóa 1 thằng phía trước thì kh thêm vào được
        $http.delete("http://localhost:3000/Question_Match/"+ id)
    }
    $scope.Update = (id) =>
    {
        // error: update trắng 
        // const huhu = document.getElementById('oldQuestion_D').innerText
        // console.log(id);
        let newArr = {
            "id": id,
            "question": $scope.newQuestion,
            "answerId": 1,
            "answers": [
              {
                "id": 1,
                "text": $scope.Question0
              },
              {
                "id": 2,
                "text": $scope.Question1
              },
              {
                "id": 3,
                "text": $scope.Question2
              },
              {
                "id": 4,
                "text": $scope.Question3
              }
            ]
          }
          $http.patch("http://localhost:3000/Question_Match/"+ id, newArr)
    }
})