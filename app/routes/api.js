var NLU_USER = "9ac168f0-5f20-459b-9854-f3d2486dbc66"; // REPLACE WITH YOUR NLU USER
var NLU_PASSWORD = "glDs1QCmEERG"; // REPLACE WITH YOUR NLU PASSWORD

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: '0TZaFjjFELA6z33t1fb7dpTCX',
    consumer_secret: 'BlAJtc5coKXrAefAuXdlKHrsxVhuPuzyXuGUHDIQgGVoZublRu',
    access_token_key: '855782415113097217-gmgOfw9bZU9CysV6fcw2mZvOEXa4MVG',
    access_token_secret: 'NKWNVd9Ot1WhFFtt6BiLmmtltAwUcl2MDFw4zr16UuYGq'
});

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username' : NLU_USER,
    'password' : NLU_PASSWORD,
    'version_date' : NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});


module.exports = function(router) {

    router.post('/tweets', function (req, res) {

        console.log(req.body.keyword);

        var params = {
            q: req.body.keyword,
            count: 100
        };

        client.get('search/tweets', params, function (error, tweets, response) {

            var statuses = tweets.statuses;

            res.json({
                tweets: tweets,
                response: response,
                statuses: statuses
            });

        });

    });

    router.post('/analyze', function (req, res) {

        var parameters = {
            text: req.body.text,
            features : {
                sentiment : {}
            }
        };
        natural_language_understanding.analyze(
            parameters,
            function(err, response) {
                if (err){
                    console.log(err);
                }
                else {
                    res.json({
                        user: req.body.user,
                        tweet: req.body.text,
                        sentiment: response
                    });
                }
            }
        );

    });

    return router;
};