



var Game = {
    preload: function () {


    },
    create: function () {

        this.canPlay = true;
        this.moves = 0;
        this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        this.logo = game.add.sprite(game.width/2, 0, 'logo');
        this.logo.anchor.setTo(0.5, 0);
        this.logo.scale.setTo(settings.logoScale);

        this.tiles = game.add.group();
        this.tiles.inputEnableChildren = true;

        this.canEnd = false;

        //create 3x3 sprites
        startX = 0;
        startY = this.logo.height;
        x = startX;
        y = startY;

        for(var i=1;i<=9;i++){

            sq = game.add.button(x, y, 'xo');
            sq.width = settings.tileSize;
            sq.height = settings.tileSize;
            sq.idx = i-1;
            sq.alpha = 0;

            if(i%3==0) {
                x = startX;
                y = (y + settings.tileSize)
            }
            else{
                x = (x + settings.tileSize);
            }

            this.tiles.add(sq);
        }

        this.tiles.onChildInputDown.add(this.go, this);

        this.drawGrid()

    },
    drawGrid:function(){

        //line1 = new Phaser.Line(0, 0, 100, 100);


        var graphics= game.add.graphics(0,0);
        graphics.lineStyle(3, 0x00000, 1);
        //vertical lines
        graphics.moveTo(settings.tileSize,this.logo.height);
        graphics.lineTo(settings.tileSize,game.height);
        graphics.moveTo(settings.tileSize*2,this.logo.height);
        graphics.lineTo(settings.tileSize*2,game.height);
        //horizontal lines
        graphics.moveTo(0, this.logo.height+settings.tileSize);
        graphics.lineTo(game.width, this.logo.height+settings.tileSize);
        graphics.moveTo(0, this.logo.height+settings.tileSize*2);
        graphics.lineTo(game.width, this.logo.height+settings.tileSize*2);

        graphics.endFill();

    },
    go:function(e){

        if(!this.canPlay){
            return;
        }
        e.frame = 1;
        this.board[e.idx] = "O";

        game.add.tween(e).to( { alpha: 1 }, 800, "Linear", true);
        this.moves++;
        this.canPlay = false;
        if(winning(this.board, "O")) {
            this.end("O");
        }
        else if(this.moves>=9){
            this.end("tie");
        }else {

            parent = this;

            game.time.events.add(Phaser.Timer.SECOND * 1,
                function(){
                    parent.computerGo();
                }, this);

        }
    },
    computerGo:function(){
        cell = minimax(this.board, "X").index;
        this.board[cell] = "X";
        this.tiles.children[cell].frame = 2;
        game.add.tween(this.tiles.children[cell]).to( { alpha: 1 }, 800, "Linear", true);
        this.moves++;
        if(winning(this.board, "X")){
            this.end("X");
        }
        else if(this.moves>=9){
            this.end("tie");
        }
        else {
            this.canPlay = true;
        }
    },
    end:function(winner){

        txt = winner + " Wins!";

        if(winner=="tie") {
            txt = "Tie Game!";
        }

        //display text
        textStyle = {font: settings.font, fill: '#FF9900', align:'center', boundsAlignH: "center", boundsAlignV: "middle"};
        resultHeading = game.add.text(game.width/2, game.height/2+40, txt + "\nTap to replay", textStyle);

        resultHeading.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);

        resultHeading.anchor.setTo(0.5);


        resultHeading.inputEnabled = true;

        resultHeading.events.onInputUp.add(function(){
            game.state.start('Game');
        }, this);




    },

    update: function(){

    },
    render:function(){

    }




};

