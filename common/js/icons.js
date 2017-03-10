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
                {type: 'image', icon: 'insert_photo'},
                {type: 'png', icon: 'insert_photo'},
                {type: 'jpg', icon: 'insert_photo'}, 
                {type: 'jpeg', icon: 'insert_photo'}, 
                {type: 'gif', icon: 'insert_photo'}, 
                {type: 'tif', icon: 'insert_photo'}, 
                {type: 'tiff', icon: 'insert_photo'}, 
                {type: 'video', icon: 'videocam'},
                {type: 'Video', icon: 'videocam'},
                {type: 'audio', icon: 'image'}, 
                {type: 'interactive', icon: 'flash_on'},
                {type: 'zip', icon: 'flash_on'}, 
                {type: 'folder', icon: 'folder'}
            ];
            return mIcons;
        }

        return Icons;

    });
