angular.module('moonshotApp')
    .factory('ItemIcons',function () {
    
        var icons = [
            {type: 'pdf', icon: 'fa-file-pdf-o'},
            {type: 'ppt', icon: 'fa-file-pdf-o'},
            {type: 'image', icon: 'fa-picture-o'},
            {type: 'png', icon: 'fa-picture-o'},
            {type: 'jpg', icon: 'fa-picture-o'}, 
            {type: 'jpeg', icon: 'fa-picture-o'}, 
            {type: 'gif', icon: 'fa-picture-o'}, 
            {type: 'tif', icon: 'fa-picture-o'}, 
            {type: 'tiff', icon: 'fa-picture-o'}, 
            {type: 'video', icon: 'fa-film'}, 
            {type: 'audio', icon: 'fa-picture-o'}, 
            {type: 'interactive', icon: 'fa-bolt'},
            {type: 'zip', icon: 'fa-bolt'}, 
            {type: 'folder', icon: 'fa-folder'}
        ];

        return icons;

    });
