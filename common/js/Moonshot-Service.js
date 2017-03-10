angular.module('moonshotApp')

.factory('MoonshotData', function($q, $location, $window, Mfly, ItemIcons, $localStorage){

    var Moonshot = {};

    Moonshot.cards = {};
    Moonshot.presentation = [];

    Moonshot.getFolders = function() {
        Mfly.search('@Moonshot').then(function(data){

            _.each(data, function(folder){

                if(Moonshot.cards.hasOwnProperty(folder.id)){
                    _.merge(Moonshot.cards[folder.id], folder, Moonshot.cards[folder.id]);
                }else{
                    folder.itemsObj = {};
                    Moonshot.cards[folder.id] = folder;
                }
            });

        });
    };

    Moonshot.updateCount = function(key, item){
        var count = 0;

        for(i in Moonshot.cards[key].itemsObj){
            count += Moonshot.cards[key].itemsObj[i].isItemSelected ? 1 : 0;
        }

        Moonshot.cards[key].itemFolderCounter = count;

    };

    Moonshot.resetCollection = function() {
        // _.forEach(Moonshot.cards, function(obj){
        //     if (obj.itemsObj) {
        //         console.log("itemsObj", obj.itemsObj);
        //     }
        // })
        
        // clear Local Storage
        $localStorage.slides = [];

        // and Reload the page
        $window.location.reload();
    };

    Moonshot.pushToPresentation = function(item) {
        // add an item to a presentation
        if (item.isItemSelected) {
            Moonshot.presentation.push(item);
            $localStorage.slides = Moonshot.presentation;
        } 
        // remove an item from the presentation
        else {

            var newArr = _.filter(Moonshot.presentation, function(obj){
               return obj.id !== item.id;
            });

            Moonshot.presentation = newArr;
            $localStorage.slides = Moonshot.presentation;

        }; 

        console.log($localStorage.slides);

    };




    Moonshot.playCollection = function() {

        var first = _.head($localStorage.slides);

        $location.url('/presentation/' + first.id + '?index=' + 0 + '&page=' + first.pages);
    };


	return Moonshot;
	
});