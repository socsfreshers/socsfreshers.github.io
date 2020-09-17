
window.onload = roomsComplete;

function roomsComplete() {
           
            var room1 = localStorage.getItem("room1");
            var room2 = localStorage.getItem("room2");
            var room3 = localStorage.getItem("room3");
            var room4 = localStorage.getItem("room4");
            var room5 = localStorage.getItem("room5");
            var room6 = localStorage.getItem("room6");
            var room7 = localStorage.getItem("room7");
            var room8 = localStorage.getItem("room8");

            //localStorage.removeItem("room5");

            if(room1 == 'complete')
            {
                document.getElementById("imglock1").src = "assets/unlock.png";
            }

            if(room2 == 'complete')
            {
                document.getElementById("imglock2").src = "assets/unlock.png";
            }

            if(room3 == 'complete')
            {
                document.getElementById("imglock3").src = "assets/unlock.png";
            }

            if(room4 == 'complete')
            {
                document.getElementById("imglock4").src = "assets/unlock.png";
            }

            if(room5 == 'complete')
            {
                document.getElementById("imglock5").src = "assets/unlock.png";
            }

            if(room6 == 'complete')
            {
                document.getElementById("imglock6").src = "assets/unlock.png";
            }

            if(room7 == 'complete')
            {
                document.getElementById("imglock7").src = "assets/unlock.png";
            }

            if(room8 == 'complete')
            {
                document.getElementById("imglock8").src = "assets/unlock.png";
            }

            // //Shows trophy if all tasks have been completed
            if(room1 == 'complete' && room2 == 'complete' && room3 == 'complete' && room4 == 'complete' && room5 == 'complete' && room6 == 'complete' && room7 == 'complete' && room8 == 'complete'){
                document.getElementById("trophy").style.visibility = "visible";
                document.getElementById("results").textContent = "Congrats! Click the trophy to reveal your prize!"
            }

            // //Test to show how the end results works
            // if(room6 == 'complete' && room3 == 'complete'){
            //     document.getElementById("trophy").style.visibility = "visible";
            //     document.getElementById("results").textContent = "Congrats! Click the trophy to reveal your prize!"
            // }

        }


//clears the locks form local storage
function clearLocks() {

localStorage.removeItem("room1");
localStorage.removeItem("room2");
localStorage.removeItem("room3");
localStorage.removeItem("room4");
localStorage.removeItem("room5");
localStorage.removeItem("room6");
localStorage.removeItem("room7");
localStorage.removeItem("room8");

location.reload();
return false;
}



//opens and closes pops ups
$(".container .trophy").click(function(){
    $(".completedOverlay").delay(100).fadeIn(100,function(){
        console.log('animation complete')
        }
        );
});
$(".closeBtn").click(function(){
    $(".completedOverlay").fadeOut(100 );
});



//Useful links to activties
function displayCup() {

    document.getElementById("results").textContent = "Task 1: Two steps forward, one step back"

}

function displayTable() {

    document.getElementById("results").textContent = "Task 2: This task is golden!"

}

function displayMonitor() {

    document.getElementById("results").textContent = "Task 3: That's a first!"

}

function displayLamphead() {

    document.getElementById("results").textContent = "Task 4: Need to fight for this answer!"

}

function displayFlatBook3() {

    document.getElementById("results").textContent = "Task 5: Don't retire yet!"

}

function displayPenstand() {

    document.getElementById("results").textContent = "Task 6: The answer to everything!"

}

function displaySlantBook() {

    document.getElementById("results").textContent = "Task 7: Half of a character!"

}

function displayWindow() {

    document.getElementById("results").textContent = "Task 8: It's not a binary choice!"

}

function displayTrophy() {

    document.getElementById("results").textContent = "Congrats! Click the trophy to reveal your prize!"

}



//Links for interest with no activities
function displayFloor() {

    document.getElementById("results").textContent = "No time for sitting down !"

}

function displayFlatBook() {

    document.getElementById("results").textContent = "This is just a book"

}

function displayKnob1() {

    document.getElementById("results").textContent = "This is just a knob"

}

function displayKnob2() {

    document.getElementById("results").textContent = "This is just a knob"
}

function displayBin() {

    document.getElementById("results").textContent = "WARNING: Clicking this will delete your progress and take you to home"
}
