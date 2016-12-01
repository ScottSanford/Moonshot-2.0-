angular.module('moonshotApp')

.factory('MoonshotData', function($q, $location, Mfly, ItemIcons, $localStorage){

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


    Moonshot.pushToPresentation = function(item) {
        
        if (item.isItemSelected) {
            Moonshot.presentation.push(item);
        } else {
            var newArr = _.filter(Moonshot.presentation, function(obj){
               return obj.id !== item.id;
            });

            Moonshot.presentation = newArr;
        }; 

    };

    Moonshot.playCollection = function() {
        $localStorage.slides = Moonshot.presentation;

        var first = _.head(Moonshot.presentation);

        $location.url('/presentation/' + first.id + '?index=' + 0);
    };

    Moonshot.resetCollection = function() {

        _.forEach(Moonshot.cards, function(obj){
            if (obj.itemsObj) {
                console.log(obj.itemsObj);
            }
        })
    };

	return Moonshot;
	
});





