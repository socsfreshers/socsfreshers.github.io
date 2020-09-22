var width = window.innerWidth,
height = window.innerHeight / 2, 
c = document.getElementById('c'), 
ctx = c.getContext('2d');
c.width = width;
c.height = height;

var mouse = {
    x: 0,
    y: 0
};

var mouseDown = false;

var patterns = [[1], [2], [1, 2], [2, 2], [2, 1, 2], [3, 3], [2, 3, 2], [4, 4], [3, 3, 3], [3, 4, 3]];
var actualPoints = [];
var possiblePoints = [];
var points = [];
var gameEnabled = false;
var lvl = 3;
var best = lvl;


function init(){
    c.addEventListener('mousedown', MouseDown, false);
    c.addEventListener('mouseup', MouseUp, false);
    c.addEventListener('mousemove', MouseMove, false);
    
    prepare();
}

function point(x, y, v){
    this.x = x;
    this.y = y;
    this.value = v;
}

function prepare(){
    possiblePoints = [];
    actualPoints = [];
    points = [];
    for (var i = 0; i < lvl; i++) {
        possiblePoints.push(i + 1);
        actualPoints.push(i + 1);
        
        //Randomise order
        possiblePoints.sort(function(){
            return 0.5 - Math.random()
        });
    }
    
    //Arrange dots in shapes/patterns
    pattern = patterns[lvl - 1];
    itemsAdded = 0;
    
    //For each row
    for (i = 0; i < pattern.length; i++) {
        rowItems = pattern[i];
        //For each item in each row
        for (var j = 0; j < rowItems; j++) {
            pointx = (Math.floor(width / 2) + 30) - 80 * j;
            pointy = (Math.floor(height / 2) + 60) - 80 * i;        
            points.push(new point(pointx, pointy, possiblePoints[itemsAdded]));
            itemsAdded++;
        }
    }
    
    gameEnabled = false;
    drawPoints(true);
    setTimeout(function(){
      hidetext();
    }, 2000);
}

function hidetext(){
    drawPoints(false);
    gameEnabled = true;
}

function drawPoints(drawText){
    for (var i = 0; i < points.length; i++) {
        console.log(i);
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 30, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'rgba(0,0,0,0.8)';
        ctx.stroke();
        
        if (drawText) {
            //Draw text
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 20px helvetica';
                                    //Offsets
            ctx.fillText(points[i].value, points[i].x - 6, points[i].y + 6);
        }

          // check if solved
        if (i === 7) {

        var text; //sets the variable for the text output
        text = "The result you need is the answer to the Ultimate Question of Life, the Universe, and Everything";

        document.getElementById("results").innerHTML = text; //inserts 'text' into the yourscore ID element.

        }


    }
}

function MouseMove(e){
    if (e.layerX || e.layerX == 0) { // Firefox
        mouse.x = e.layerX - c.offsetLeft;
        mouse.y = e.layerY - c.offsetTop + 40; //Plus 40 to factor in the home logo
    }
}

function MouseDown(e){
    if (e.layerX || e.layerX == 0) {
        mouseDown = true;
    }
}

function handlePointClick(point){
    if (point.value == actualPoints[0]) {
        actualPoints.splice(0, 1);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px helvetica';
                                    
                                    //Clean up scappy dupplicate code
                                    //Offsets
        ctx.fillText(point.value, point.x - 6, point.y + 6);
        
        if (actualPoints.length == 0) {
            clear();
            if (lvl < patterns.length){
                lvl = lvl + 1;
            }
            
            prepare();
            return;
        }
    } else {
        clear();
        lvl = lvl - 1;
        prepare();    
    } 
}

function clear(){
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
}

function MouseUp(e){
    if (e.layerX || e.layerX == 0) {
        mouseDown = false;
        
        if (gameEnabled) {
            for (var i = 0; i < points.length; i++) {
                var dx = points[i].x - mouse.x;
                var dy = points[i].y - mouse.y;
                sqrDist = Math.sqrt(dx * dx + dy * dy);
                
                if (sqrDist < 30) {
                    handlePointClick(points[i]);
                    return;
                }
            }        
        }
    }
}

init();



// Check answer to challange
// Yep, it's not going to be that easy! Now stop cheating!!!

var answer = "92cfceb39d57d914ed8b14d0e37643de0797ae56"; //SHA1 value of correct answer

function getAnswer() {
  var y = document.getElementById("answer");

  var x = SHA1(y.value);

  if(x != answer){
        document.getElementById('answer').style.backgroundColor = "red"; //when answer is incorrcet turn red
        return false;
    }else{
        document.getElementById('answer').style.backgroundColor = "green"; //when answer is correct turn green

        var wellDone; //sets the variable for the text output
        wellDone = "Congratulations you've completed this task!";
        document.getElementById("results").innerHTML = wellDone; //inserts 'text' into the yourscore ID element.

        localStorage.setItem("room6", "complete");
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
