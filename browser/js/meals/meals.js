app.config(function ($stateProvider) {
    $stateProvider.state('meals', {
        url: '/meals',
        templateUrl: 'js/meals/meals.html',
        controller: 'MealsCtrl'
    });
});

app.controller('MealsCtrl', function($scope, MealFactory, Session){
    // $scope.meals = [ //array of meal suggestions go here
    // {
    //     title: 'salad',
    //     url: 'https://lighterphotos-production.s3.amazonaws.com/uploads/recipe/image/1519/SuperSeedSalad6773.jpg'
    //     },
    //     {
    //     title: 'other thing',
    //     url: `https://lighterphotos-production.s3.amazonaws.com/uploads/recipe/image/1084/2EnergizingMuesliFreshBerries__MelissaBlackall__-8.jpg`
    // }
    // ];

    $scope.meals = [];

    MealFactory.getMealPlan(Session.user.id)
    .then(function(meals){
        $scope.meals = meals;
        console.log($scope.meals)
    })
    // todo add error handling here.

    $scope.slickConfig = {
        adaptiveHeight: true,
        // initialSlide: 0,
        mobileFirst: true,
        slidesToScroll: 1,
        slideToShow: 1,
        method: {}
    }
});

app.factory('MealFactory', function($http){

    let MealFactory = {};

    MealFactory.getMealPlan = function(userId){
        return $http.get(`api/users/${userId}/meals`)
        .then(function(response){
            return response.data;
        });
    };

    return MealFactory;
});
