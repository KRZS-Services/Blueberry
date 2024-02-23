document.getElementById("content").style.display = "block";

if (KRZSStore.getItem("level") == "{}") {
    CurrentLevel = 0;
    CurrentXp = 0;
    XpToNextLevel = 100;
} else {
    CurrentLevel = new Number(KRZSStore.getItem("level"));
    CurrentXp = new Number(KRZSStore.getItem("xp"));
    Arrayrepeat = new Number(KRZSStore.getItem("arrayrep"));
    document.querySelector(".xplevel").textContent = CurrentLevel;
    document.querySelector(".xpwidth").style.width = (CurrentXp*100)/(5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90) + "%";
};
if (KRZSStore.getItem("taskscompleted") == "{}") {
    TasksCompleted = 0;
} else {
    TasksCompleted = new Number(KRZSStore.getItem("taskscompleted"));
};
if (KRZSStore.getItem("tasks") == "{}") {
    Names = [];
    Values = [];
    Numbers = [];
} else {
    Names = JSON.parse(KRZSStore.getItem("tasks")).names;
    Values = JSON.parse(KRZSStore.getItem("tasks")).values;
    Numbers = JSON.parse(KRZSStore.getItem("tasks")).numbers;
};
if (KRZSStore.getItem("customrewards") == "{}") {
    RewardNames = [];
    RewardLevels = [];
    RewardNumbers = [];
    KRZSStore.setItem("customrewards", JSON.stringify({
        "names": [],
        "levels": [],
        "numbers": []
    }));
} else {
    RewardNames = JSON.parse(KRZSStore.getItem("customrewards")).names;
    RewardLevels = JSON.parse(KRZSStore.getItem("customrewards")).levels;
    RewardNumbers = JSON.parse(KRZSStore.getItem("customrewards")).numbers;
};
if (KRZSStore.getItem("customrewards") != "{}") {
    for (let index = 0; index < JSON.parse(KRZSStore.getItem("customrewards")).names.length; index++) {
        var newelem = document.createElement("li");
        var newspan = document.createElement("span");
        var randnum = document.createElement("randnum");
        randnum.innerHTML = RewardNumbers[index];
        newspan.classList.add("menutext");
        newspan.textContent = RewardNames[index] + " - Level " + RewardLevels[index];
        newelem.appendChild(newspan);
        document.querySelector(".menuul").appendChild(newelem);
        newelem.appendChild(randnum);
        newelem.onclick = function () {
            if (document.querySelector("#deletereward").classList.contains("active")) {
                RewardNames.splice(RewardNumbers.indexOf(event.target.firstChild.nextSibling.textContent), 1);
                RewardLevels.splice(RewardNumbers.indexOf(event.target.firstChild.nextSibling.textContent), 1);
                RewardNumbers.splice(RewardNumbers.indexOf(event.target.firstChild.nextSibling.textContent), 1);
                KRZSStore.setItem("customrewards", JSON.stringify({
                    "names": RewardNames,
                    "levels": RewardLevels,
                    "numbers": RewardNumbers
                }));
                event.target.remove();
                document.querySelector("#deletereward").classList.remove("active");
            };
        };
    };
};
function removeItem(item) {
    setTimeout(function () {item.remove();},1500);
};
function btnClick() {
    event.target.disabled = true;
    Parenttarget = event.target.parentElement.parentElement;
    addXp(event.target.parentElement.parentElement.firstChild.nextSibling.innerHTML);
    event.target.parentElement.parentElement.style.opacity = "0%";
    removeItem(event.target.parentElement.parentElement);
    var indexnum = Numbers.indexOf(event.target.parentElement.parentElement.firstChild.nextSibling.nextSibling.innerHTML);
    
    Numbers.splice(indexnum, 1);
    Names.splice(indexnum, 1);
    Values.splice(indexnum, 1);
    KRZSStore.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
    TasksCompleted = TasksCompleted+1;
    KRZSStore.setItem("taskscompleted", TasksCompleted);
};
function updateName(text, index) {
    Names.splice(new Number(index), 1, text);
    KRZSStore.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
};
for (let index = 0; index < Names.length; index++) {
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    pelem.classList.add("pelem");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () { btnClick() };
    var ptext = document.createElement("span");
    ptext.contentEditable = true;
    ptext.textContent = Names[index];
    if (Values[index] == "75") {
        ptext.classList.add("normalpriority");
    } else if (Values[index] == "100") {
        ptext.classList.add("highpriority");
    } else if (Values[index] == "50") {
        ptext.classList.add("lowpriority");
    } else if (Values[index] == "0") {
        ptext.classList.add("rewardpriority");
    } else {
        ptext.classList.add("debugpriority");
    };
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = Values[index];
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Numbers[index];
    ptext.onblur = function(){updateName(event.target.textContent, Numbers.indexOf(event.target.parentElement.nextSibling.nextSibling.textContent.toString()))};
    ptext.onclick = function(){
        if (ShiftKeyDown) {
            event.target.parentElement.parentElement.remove();
            Numbers.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            Names.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            Values.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            KRZSStore.setItem("tasks", JSON.stringify({
                "names": Names,
                "values": Values,
                "numbers": Numbers
            }));
        }
    };
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    taskelem.appendChild(randnum);
    document.querySelector(".tasks").appendChild(taskelem);
}
document.getElementById("newtaskform").onsubmit = function () {
    event.preventDefault();
    document.querySelector("#taskcreate").disabled = true;
    document.querySelector("#taskcancel").disabled = true;
    document.querySelector("#taskpriority").disabled = true;
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    pelem.classList.add("pelem");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () { btnClick() };
    var ptext = document.createElement("span");
    ptext.contentEditable = true;
    ptext.textContent = document.querySelector(".taskname").value;
    if (document.querySelector(".taskpriority").value == "75") {
        ptext.classList.add("normalpriority");
    } else if (document.querySelector(".taskpriority").value == "100") {
        ptext.classList.add("highpriority");
    } else if (document.querySelector(".taskpriority").value == "50") {
        ptext.classList.add("lowpriority");
    } else if (document.querySelector(".taskpriority").value == "0") {
        ptext.classList.add("rewardpriority");
    } else {
        ptext.classList.add("debugpriority");
    };
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = document.querySelector(".taskpriority").value;
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Math.random()*10;
    Nindex = Numbers.length;
    ptext.onblur = function(){updateName(event.target.textContent, Numbers.indexOf(event.target.parentElement.nextSibling.nextSibling.textContent.toString()))};
    ptext.onclick = function(){
        if (ShiftKeyDown) {
            event.target.parentElement.parentElement.remove();
            Numbers.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            Names.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            Values.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            KRZSStore.setItem("tasks", JSON.stringify({
                "names": Names,
                "values": Values,
                "numbers": Numbers
            }));
        }
    };
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    taskelem.appendChild(randnum);
    document.querySelector(".tasks").appendChild(taskelem);
    Names.push(document.querySelector("#taskname").value);
    Values.push(document.querySelector("#taskpriority").value);
    Numbers.push(randnum.innerHTML);
    document.querySelector(".modaloverlay").style.opacity = "0%";
    KRZSStore.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
    setTimeout(function () {
        document.querySelector(".modaloverlay").style.display = "none";
        document.querySelector(".taskmodal").style.display = "none";
        document.querySelector("#taskcreate").disabled = false;
        document.querySelector("#taskcancel").disabled = false;
        document.querySelector("#taskpriority").disabled = false;
        document.querySelector("#taskname").value = "";
        document.querySelector("#taskpriority").value = "75";
    }, 1100);
};
document.querySelector(".addnewtask").onclick = function () {
    document.querySelector(".taskmodal").style.display = "block";
    document.querySelector(".modaloverlay").style.display = "flex";
    setTimeout(function () {document.querySelector(".modaloverlay").style.opacity = "100%";},100);
};
document.querySelector("#taskcancel").onclick = function () {
    event.preventDefault();
    document.querySelector("#taskcreate").disabled = true;
    document.querySelector("#taskcancel").disabled = true;
    document.querySelector("#taskpriority").disabled = true;
    document.querySelector(".modaloverlay").style.opacity = "0%";
    setTimeout(function () {
        document.querySelector(".modaloverlay").style.display = "none";
        document.querySelector(".taskmodal").style.display = "none";
        document.querySelector("#taskcreate").disabled = false;
        document.querySelector("#taskcancel").disabled = false;
        document.querySelector("#taskpriority").disabled = false;
        document.querySelector("#taskname").value = "";
        document.querySelector("#taskpriority").value = "75";
    }, 1100);
};
function addXp(amount) {
    CurrentXp = CurrentXp + new Number(amount);
    XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
    if (XpToNextLevel <= 0) {
        CurrentLevel = CurrentLevel + 1;
        CurrentXp = Math.abs(XpToNextLevel);
        XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
        document.querySelector(".xplevel").textContent = CurrentLevel;
    }
    document.querySelector(".xpwidth").style.width = (CurrentXp*100)/(5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90) + "%";
    KRZSStore.setItem("level", CurrentLevel);
    KRZSStore.setItem("xp", CurrentXp);
}
function dataClear() {
    if (confirm("You are about to clear all the website data.\n\nThis includes XP, levels, tasks, customization settings, and statistics. Are you sure you want to do this?")) {
        KRZSStore.clear();
        alert("All cleared!");
        location.reload();
    };
};
document.querySelector("#addreward").onclick = function () {
    document.querySelector(".rewardmodal").style.display = "block";
    document.querySelector(".modaloverlay").style.display = "flex";
    setTimeout(function () {document.querySelector(".modaloverlay").style.opacity = "100%";},100);
};
document.querySelector("#deletereward").onclick = function () {
    if (event.target.classList.contains("active")) {
        event.target.classList.remove("active");
    } else {
        event.target.classList.add("active");
    };
};
document.querySelector("#rewardcancel").onclick = function () {
    event.preventDefault();
    document.querySelector("#rewardcreate").disabled = true;
    document.querySelector("#rewardcancel").disabled = true;
    document.querySelector(".modaloverlay").style.opacity = "0%";
    setTimeout(function () {
        document.querySelector(".modaloverlay").style.display = "none";
        document.querySelector(".rewardmodal").style.display = "none";
        document.querySelector("#rewardcreate").disabled = false;
        document.querySelector("#rewardcancel").disabled = false;
        document.querySelector("#rewardname").value = "";
        document.querySelector("#rewardlevel").value = "";
    }, 1100);
};
document.getElementById("newrewardform").onsubmit = function () {
    event.preventDefault();
    document.querySelector("#rewardcreate").disabled = true;
    document.querySelector("#rewardcancel").disabled = true;
    var newelem = document.createElement("li");
    var newspan = document.createElement("span");
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Math.random()*10;
    newspan.classList.add("menutext");
    newspan.textContent = document.querySelector("#rewardname").value + " - Level " + document.querySelector("#rewardlevel").value;
    newelem.appendChild(newspan);
    document.querySelector(".menuul").appendChild(newelem);
    newelem.appendChild(randnum);
    newelem.onclick = function () {
        if (document.querySelector("#deletereward").classList.contains("active")) {
            RewardNames.splice(RewardNumbers.indexOf(event.target.firstChild.nextSibling.textContent), 1);
            RewardLevels.splice(RewardNumbers.indexOf(event.target.firstChild.nextSibling.textContent), 1);
            RewardNumbers.splice(RewardNumbers.indexOf(event.target.firstChild.nextSibling.textContent), 1);
            KRZSStore.setItem("customrewards", JSON.stringify({
                "names": RewardNames,
                "levels": RewardLevels,
                "numbers": RewardNumbers
            }));
            event.target.remove();
            document.querySelector("#deletereward").classList.remove("active");
        };
    };
    RewardNames.push(document.querySelector("#rewardname").value);
    RewardLevels.push(document.querySelector("#rewardlevel").value);
    RewardNumbers.push(randnum.innerHTML);
    KRZSStore.setItem("customrewards", JSON.stringify({
        "names": RewardNames,
        "levels": RewardLevels,
        "numbers": RewardNumbers
    }));
    document.querySelector(".modaloverlay").style.opacity = "0%";
    setTimeout(function () {
        document.querySelector(".modaloverlay").style.display = "none";
        document.querySelector(".rewardmodal").style.display = "none";
        document.querySelector("#rewardcreate").disabled = false;
        document.querySelector("#rewardcancel").disabled = false;
        document.querySelector("#rewardname").value = "";
        document.querySelector("#rewardlevel").value = "0";
    }, 1100);
}
function notify(text) {
    var notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = text;
    document.body.insertBefore(notification, document.body.firstChild);
    var audio = document.querySelector("audio");
    audio.currentTime = 0;
    audio.play();
    setTimeout(function () {
        notification.remove();
    },5000);
};
// Debug
function showDebugOption(num) {
    var option = document.createElement("option");
    option.value = num;
    option.textContent = `Debug (${num})`;
    document.querySelector("#taskpriority").appendChild(option);
    return "Successfully added a debug option.";
};
DevMode = false;
function developerMode() {
    if (DevMode == false) {
        DevMode = true;
        document.getElementById("devmode").textContent = `xpvalue,randnum{display:block}`
        return "Developer mode enabled.";
    } else {
        DevMode = false;
        document.getElementById("devmode").textContent = `xpvalue,randnum{display:none}`
        return "Developer mode disabled.";
    }
};

function homeTab() {
    document.querySelector(".content").style.display = "none";
    document.querySelector(".statistics").style.display = "none";
    document.querySelector(".customrewards").style.display = "none";
    document.querySelector(".home").style.display = "block";
    document.querySelector("#tasksbutton").classList.remove("tabbedin");
    document.querySelector("#statsbutton").classList.remove("tabbedin");
    document.querySelector("#customrewardsbutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.add("tabbedin");
};
function tasksTab() {
    document.querySelector(".statistics").style.display = "none";
    document.querySelector(".customrewards").style.display = "none";
    document.querySelector(".home").style.display = "none";
    document.querySelector(".content").style.display = "block";
    document.querySelector("#statsbutton").classList.remove("tabbedin");
    document.querySelector("#customrewardsbutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.remove("tabbedin");
    document.querySelector("#tasksbutton").classList.add("tabbedin");
};
function statisticsTab() {
    allxp = 0;
    for (let i = 0; i < CurrentLevel-1; i++) {
        var allxp = allxp + (5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90);
    }
    allxp = allxp + CurrentXp;
    if (CurrentLevel != 0) {
        allxp = allxp + 100;
    }
    document.querySelector("#stats1").textContent = TasksCompleted;
    document.querySelector("#stats2").textContent = allxp;
    document.querySelector("#stats3").textContent = CurrentLevel;
    document.querySelector(".content").style.display = "none";
    document.querySelector(".customrewards").style.display = "none";
    document.querySelector(".home").style.display = "none";
    document.querySelector(".statistics").style.display = "block";
    document.querySelector("#tasksbutton").classList.remove("tabbedin");
    document.querySelector("#customrewardsbutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.remove("tabbedin");
    document.querySelector("#statsbutton").classList.add("tabbedin");
};
function customRewardsTab() {
    document.querySelector(".content").style.display = "none";
    document.querySelector(".statistics").style.display = "none";
    document.querySelector(".home").style.display = "none";
    document.querySelector(".customrewards").style.display = "block";
    document.querySelector("#tasksbutton").classList.remove("tabbedin");
    document.querySelector("#statsbutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.remove("tabbedin");
    document.querySelector("#customrewardsbutton").classList.add("tabbedin");
};