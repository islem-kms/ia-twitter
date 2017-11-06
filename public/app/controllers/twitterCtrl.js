angular.module('twitterController', [])

.controller('twitterCtrl', function ($http) {

    var app = this;

    this.analyzeForm = function (searchData) {

        $http.post('api/tweets', searchData)
            .then(function (response) {

                var statuses = response.data.statuses;

                app.responses = [];

                for (var i = 0; i < response.data.statuses.length; i++) {

                    if (statuses[i].lang == "ar"
                        || statuses[i].lang == "fr"
                        || statuses[i].lang == "en") {

                        $http.post('api/analyze', statuses[i])

                            .then(function (sentiment) {

                                app.responses.push(sentiment.data);

                            });

                    }

                }

            });

    }

});