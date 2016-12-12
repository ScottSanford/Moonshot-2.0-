angular.module("moonshotApp", [
        'ui.router', 
        'myFilters', 
        'myDirectives',
        'ui.bootstrap', 
        'ngclipboard', 
        'ui.sortable', 
        'ngStorage', 
        'ngAnimate', 
        'ngMaterial', 
        'ngMdIcons', 
        'md.data.table', 
        'dark-sky', 
        'angularMoment'
    ])

    .config(function ($compileProvider, $stateProvider, $urlRouterProvider, darkSkyProvider) { 

          darkSkyProvider.setApiKey('a0eb9b7587d7bcaf6e9e06bffc6cfdfc');
          darkSkyProvider.setUnits('us');
          darkSkyProvider.setLanguage('en');

          $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:|https:\/\/|http:\/\/)/);

          // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("/dashboard");
          
          $stateProvider
                .state('dashboard', {
                    url: '/dashboard', 
                    templateUrl: 'components/dashboard/dashboard.html',                    
                    controller: 'ReportsCtrl'
                })
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
                .state('details', {
                    url: '/collection-details/:cid', 
                    templateUrl: 'components/collection-details/collection-details.html', 
                    controller: 'CollectionDetailCtrl'
                })
                .state('hierarchy', {
                    url: '/hierarchy', 
                    templateUrl: 'components/hierarchy/hierarchy.html', 
                    controller: 'HierachyCtrl'
                })
                .state('search', {
                    url: '/search', 
                    templateUrl: 'components/search/search.html', 
                    controller: 'SearchCtrl'
                })
                .state('presentation', {
                    url: '/presentation/{itemId}?collection&page&index', 
                    templateUrl: 'components/presentation/presentation.html',                    
                    controller: 'PresentationCtrl'
                })

    });
        