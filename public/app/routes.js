angular.module('appRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {

                templateUrl: 'app/views/pages/analyze.html',
                controller: 'twitterCtrl',
                controllerAs: 'twit'

            })

            .otherwise(
                {
                    redirectTo: ''
                }
            );

        $locationProvider.html5Mode(
            {
                enabled: true,
                requireBase: false
            }
        );
    });