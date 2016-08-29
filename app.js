angular.module("moonshotApp", [
        'ui.router', 
        'pageslide-directive', 
        'myFilters', 
        'myDirectives',
        'ui.bootstrap', 
        'ngclipboard', 
        'ui.sortable'
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
                    url: '/collections/:id/:name/:created/:modified', 
                    templateUrl: 'components/collection-details/collection-details.html', 
                    controller: 'CollectionDetailCtrl'
                })
                .state('search', {
                    url: '/search', 
                    templateUrl: 'components/search/search.html', 
                    controller: 'SearchCtrl'
                })
                .state('presentation', {
                    url: '/presentation', 
                    templateUrl: 'components/presentation/presentation.html',                    
                    controller: 'PresentationCtrl', 
                    resolve: {
                        presentation: function(PresentationService) {
                            return PresentationService;
                        }
                    }
                })
                .state('presentation.slides', {
                    url: '/slides', 
                    views: {
                        'presentation-slides': {
                            templateUrl: 'components/slides/slides.html', 
                        }
                    },
                    controller: 'PresentationCtrl'
                })

    });
        