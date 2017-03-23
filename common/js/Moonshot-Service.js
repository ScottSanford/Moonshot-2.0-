angular.module('moonshotApp')

.factory('MoonshotData', function($q, $location, $window, Mfly, ItemIcons, $localStorage){

    var Moonshot = {};

    Moonshot.cards = {};
    Moonshot.presentation = [];

    Moonshot.getFolders = function() {
        // GETS AIRSHIP FOLDERS THAT HAVE KEYWORD '@Moonshot' ATTACHED TO IT.
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

    // THIS IS FOR BACK OF CARD COUNTER
    Moonshot.updateCount = function(key, item){
        var count = 0;

        for(i in Moonshot.cards[key].itemsObj){
            count += Moonshot.cards[key].itemsObj[i].isItemSelected ? 1 : 0;
        }

        Moonshot.cards[key].itemFolderCounter = count;

    };

    Moonshot.resetCollection = function() {
        // clear Local Storage && Moonshot.presentation arrays
        $localStorage.slides = [];
        Moonshot.presentation = [];

        // and Reload the page
        $window.location.reload();
    };

    Moonshot.pushToPresentation = function(item) {
        // add an item to a presentation
        if (item.hasOwnProperty('isItemSelected') && item.isItemSelected) {
            Moonshot.presentation.push(item);
            $localStorage.slides = Moonshot.presentation;
        } 
        // remove an item that was de-selected from the card list
        else {

            var newArr = _.filter(Moonshot.presentation, function(obj){
               return obj.id !== item.id;
            });

            Moonshot.presentation = newArr;
            $localStorage.slides = Moonshot.presentation;

        }; 

    };


    Moonshot.playCollection = function() {

        var firstSlide = _.head($localStorage.slides);

        if (firstSlide.type === 'interactive') {
            $location.url('presentation/' + firstSlide.id + '?type=interactive');
        } 
        else if (firstSlide.pages > 1) {
            $location.url('presentation/' + firstSlide.id + '?page=0');
        }
        else {
            $location.url('presentation/' + firstSlide.id);
        }
        
    };


	return Moonshot;
	
});