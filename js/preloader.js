var loadingText;
var Preloader = {

    preload : function() {


        loadingText = game.add.text(32, 100, 'Loading...', { font:"23px Arial", fill: '#FFF'});

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.scale.refresh();

        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);

        // Load all the needed resources for the menu.

        //Global Assets
        game.stage.backgroundColor = '#e6001c';

        //Main Game Assets
        game.load.start();
        game.load.image('logo','img/logo.png?v=3');
        game.load.spritesheet('xo', 'img/oxo-sprite.png', 400, 512, 3);


    },
    loadStart : function(){
        loadingText.setText("Loading ...");
    },
    loadComplete : function(){
        game.state.start('Game');
    },
    fileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadingText.setText("Loading: " + progress + "% - " + totalLoaded + " of " + totalFiles);
    },
    create: function () {

    }
};