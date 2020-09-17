
//---------create canvass alien game

// Create the canvas
var canvas = document.getElementById("canvas"); //get the canvess (sze defined in the css)
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas); //place the canvess

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "assets/background.gif"; //get background image

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "assets/hero.png"; //get the hero image 


// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "assets/monster.png"; //get the moster/alien image


// Game objects
var hero = {
  speed: 256 // movement in pixels per second. Change this to amend travel
};
var monster = {};
var monstersCaught = 0; //intial status of how many monster have been caught to keep a score/top score etc

// Handle keyboard controls
var keysDown = {}; //initiates the keydown function to control the aliens

addEventListener("keydown", function (e) { //event lister for the var keydwon
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
  document.getElementById("arrowkeys1").style.opacity = "0"; //when key is up (or not down) change opacity to 0.
  document.getElementById("arrowkeys2").style.opacity = "0";
  document.getElementById("arrowkeys3").style.opacity = "0";
  document.getElementById("arrowkeys4").style.opacity = "0";
}, false);

// Reset the game when the player catches a monster
var reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2; //place hereo at centre of page on reset

  // Throw the monster somewhere on the screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64)); //random position along x and y using math/random takign into account image size
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown) { // Player holding up
    hero.y -= hero.speed * modifier;
    document.getElementById("arrowkeys1").style.opacity = "0.8"; //when key is pressed show the arrow keys on the screen 9change opacity to 0.8)
  }
  if (40 in keysDown) { // Player holding down
    hero.y += hero.speed * modifier;
    document.getElementById("arrowkeys2").style.opacity = "0.8";
  }
  if (37 in keysDown) { // Player holding left
    hero.x -= hero.speed * modifier;
    document.getElementById("arrowkeys3").style.opacity = "0.8";
  }
  if (39 in keysDown) { // Player holding right
    hero.x += hero.speed * modifier;
    document.getElementById("arrowkeys4").style.opacity = "0.8";
  }

  // check to see if the players are touching
  if (
    hero.x <= (monster.x + 32) //checks positions of players (including size of players) to see if they occupy the same space
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset(); //if players are in the same space then the game rests
  }
};

// document.getElementById("arrowkeys").style.opacity = "0.8";

// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // Score text styles
  ctx.fillStyle = "white";
  ctx.font = "25px Major Mono Display";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("TOTAL: " + monstersCaught, 32, 32); //fill canvess with the score 'monsterscaught'

};


// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// starts the game
var then = Date.now();
reset();
main();


// Game Timer

function checklength(i) {
    'use strict';
    if (i < 10) { 
        i = "0" + i;
    }
    return i;
}
var minutes, seconds, count, counter, timer;
count = 11; //game time in seconds - add 1 sec so it starts on the time you wnat to count down from
counter = setInterval(timer, 1000);

// creates count down timer in minutes and seconds

function timer() {
    'use strict';
    count = count - 1;
    minutes = checklength(Math.floor(count / 60));
    seconds = checklength(count - minutes * 60);
    if (count < 0) {
        clearInterval(counter);
        //localStorage.setItem("monstersCaught", monstersCaught);

        if (monstersCaught > 6) { //number of monstors caught in the game
          var txt = "Julie is my favourite grandma. She is the oldest person in the familly but when I ask her how old she is,  she cunningly replied that she was 20 years old, only counting Saturdays and Sundays. How old is she?"; 
          document.getElementById("results").innerHTML = txt; //write to html tag if the player scores highets score      
        }

        return;
    }
    document.getElementById("timer").innerHTML = 'Time left: ' + seconds + ' ';

// When count is at 0 secs the game will reload and repeat

    if (count === 0 && monstersCaught <= 6) { //when game hits 0 sec then it restarts
        location.reload();
    }
}



// Check answer to challange

var answer = "70";

function getAnswer() {
  var x = document.getElementById("answer");

  if(x.value != answer){
        document.getElementById('answer').style.backgroundColor = "red"; //when answer is incorrcet turn red
        return false;
    }else{
        document.getElementById('answer').style.backgroundColor = "green"; //when answer is correct turn green

        var wellDone; //sets the variable for the text output
        wellDone = "Congratulations you've completed this task!";
        document.getElementById("results").innerHTML = wellDone; //inserts 'text' into the yourscore ID element

        localStorage.setItem("room3", "complete");
    };
}


// SHA1 Function
function SHA1 (msg) {

    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };

    function lsb_hex(val) {
        var str="";
        var i;
        var vh;
        var vl;

        for( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str="";
        var i;
        var v;

        for( i=7; i>=0; i-- ) {
            v = (val>>>(i*4))&0x0f;
            str += v.toString(16);
        }
        return str;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();

    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    }

    switch( msg_len % 4 ) {

        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
            break;
        case 2:
            i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
            break;
        case 3:
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
            break;
    }

    word_array.push( i );

    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
      word_array.push( msg_len>>>29 );
      word_array.push( (msg_len<<3)&0x0ffffffff );

    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {

        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();
}

console.log('initialized');
