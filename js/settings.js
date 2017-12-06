var mobileSettings = {
    tileSize:100,
    logoScale:0.3,
    font:"40px Arial Black"
};

var desktopSettings = {
    tileSize:150,
    logoScale:0.5,
    font:"45px Arial Black"
};

var settings = mobileSettings;

var w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


w = (settings.tileSize*3);
h = 370;

if (w > 800){
    //Switch to desktop settings
    settings = desktopSettings;
    h = 600;
}

//max width height

//800 x 450




