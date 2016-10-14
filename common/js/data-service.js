angular.module('moonshotApp')

.factory('MoonshotData', function($q, Mfly, ItemIcons){

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

    Moonshot.updateCount = function(key){
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

	return Moonshot;
	
});





