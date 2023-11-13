if (localStorage.getItem("level") == null) {
    CurrentLevel = 0;
    CurrentXp = 0;
    XpToNextLevel = 100;
} else {
    CurrentLevel = new Number(localStorage.getItem("level"));
    CurrentXp = new Number(localStorage.getItem("xp"));
    Arrayrepeat = new Number(localStorage.getItem("arrayrep"));
    document.querySelector(".xplevel").textContent = CurrentLevel;
    document.querySelector(".xpwidth").style.width = (CurrentXp*100)/(5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90) + "%";
}
if (localStorage.getItem("tasks") == null) {
    Names = [];
    Values = [];
    Numbers = [];
} else {
    Names = JSON.parse(localStorage.getItem("tasks")).names;
    Values = JSON.parse(localStorage.getItem("tasks")).values;
    Numbers = JSON.parse(localStorage.getItem("tasks")).numbers;
}
function btnClick() {
    Parenttarget = event.target.parentElement.parentElement;
    var audio = new Audio('/assets/sounds/complete.ogg');
    audio.play();
    addXp(Parenttarget.firstChild.nextSibling.innerHTML);
    Parenttarget.style.opacity = "0%";
    setTimeout(function () {
        Parenttarget.remove();
    },1500);
    var indexnum = Numbers.indexOf(Parenttarget.firstChild.nextSibling.nextSibling.innerHTML);
    Numbers.splice(indexnum, 1);
    Names.splice(indexnum, 1);
    Values.splice(indexnum, 1);
    localStorage.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
}
for (let index = 0; index < Names.length; index++) {
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () { btnClick() };
    var ptext = document.createTextNode(" " + Names[index]);
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = Values[index];
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Numbers[index];
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    taskelem.appendChild(randnum);
    document.querySelector(".tasks").appendChild(taskelem);
}
document.getElementById("newtaskform").onsubmit = function () {
    event.preventDefault();
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () { btnClick() };
    var ptext = document.createTextNode(" " + document.querySelector(".taskname").value);
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = document.querySelector(".taskpriority").value;
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Math.random()*10;
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    taskelem.appendChild(randnum);
    document.querySelector(".tasks").appendChild(taskelem);
    Names.push(document.querySelector(".taskname").value);
    Values.push(document.querySelector(".taskpriority").value);
    Numbers.push(randnum.innerHTML);
    document.querySelector(".taskmodal").style.opacity = "0%";
    document.querySelector(".taskname").value = "";
    localStorage.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
    setTimeout(function () {document.querySelector(".taskmodal").style.display = "none";}, 1000);
}
document.querySelector(".addnewtask").onclick = function () {
    document.querySelector(".taskmodal").style.display = "block";
    setTimeout(function () {document.querySelector(".taskmodal").style.opacity = "100%";})
}
document.querySelector(".taskcancel").onclick = function () {
    document.querySelector(".taskmodal").style.opacity = "0%";
    document.querySelector(".taskname").value = "";
    setTimeout(function () {document.querySelector(".taskmodal").style.display = "none";}, 1000);
}
function addXp(amount) {
    CurrentXp = CurrentXp + new Number(amount);
    XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
    if (XpToNextLevel <= 0) {
        CurrentLevel = CurrentLevel + 1;
        CurrentXp = Math.abs(XpToNextLevel);
        XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
        document.querySelector(".xplevel").textContent = CurrentLevel;
        var audio = new Audio('/assets/sounds/levelup.ogg');
        audio.play();
        document.querySelector(".confetti").style.display = "block";
        setTimeout(function () {document.querySelector(".confetti").style.display = "none"},2000);
    }
    document.querySelector(".xpwidth").style.width = (CurrentXp*100)/(5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90) + "%";
    localStorage.setItem("level", CurrentLevel);
    localStorage.setItem("xp", CurrentXp);
}
function dataClear() {
    if(confirm("You are about to clear all the website data.\n\nThis includes XP, levels, and tasks. Are you sure you want to do this?")) {
        localStorage.clear();
        alert("All cleared!");
        location.reload();

    } else {
        alert("Alright then, we won't.");
    }
}