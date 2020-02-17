var placem = document.getElementById("thirdPage");
var remo = document.getElementById("secondPage");
var stat = document.getElementById("firstPage");

// This method makes placement page visible
function placement() {
    remo.classList.add("gone");
    placem.classList.remove("gone");
    stat.classList.add("gone");
}

// This method makes removal page visible
function removal() {
    remo.classList.remove("gone");
    placem.classList.add("gone");
    stat.classList.add("gone");
}

function stats(){
    remo.classList.add("gone");
    placem.classList.add("gone");
    stat.classList.remove("gone");
}