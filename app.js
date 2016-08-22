angular.module("moonshotApp", [
        'ui.router', 
        'pageslide-directive', 
        'myFilters', 
        'ui.bootstrap', 
        'ngclipboard'
    ])

    .config(function ($compileProvider, $stateProvider, $urlRouterProvider) { 

          $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:|https:\/\/)/);

          // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("/cards");
          
          $stateProvider
                .state('cards', {
                    url: '/cards',
                    templateUrl: 'components/cards/cards.html', 
                    controller: 'CardsCtrl'
                })
                .state('collections', {
                    url: '/collections', 
                    templateUrl: 'components/collections/collections.html', 
                    controller: 'CollectionsCtrl'
                })
                .state('detail', {
                    url: '/collections/:id', 
                    templateUrl: 'components/collections/collection.html', 
                    controller: 'CollectionsCtrl'
                })
                .state('search', {
                    url: '/search', 
                    templateUrl: 'components/search/search.html', 
                    controller: 'SearchCtrl'
                })
    });
        