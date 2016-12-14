angular.module('moonshotApp')
    .factory('ItemIcons',function () {
    
        var Icons = {};

        Icons.fontAwesome = function() {
            var faIcons = [
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
            return faIcons;
        };
            

        Icons.material = function() {
            var mIcons = [
                {type: 'pdf', icon: 'insert_drive_file'},
                {type: 'ppt', icon: 'insert_drive_file'},
                {type: 'image', icon: 'image'},
                {type: 'png', icon: 'image'},
                {type: 'jpg', icon: 'image'}, 
                {type: 'jpeg', icon: 'image'}, 
                {type: 'gif', icon: 'image'}, 
                {type: 'tif', icon: 'image'}, 
                {type: 'tiff', icon: 'image'}, 
                {type: 'video', icon: 'film'}, 
                {type: 'audio', icon: 'image'}, 
                {type: 'interactive', icon: 'flash_on'},
                {type: 'zip', icon: 'flash_on'}, 
                {type: 'folder', icon: 'folder'}
            ];
            return mIcons;
        }

        return Icons;

    });
