document.getElementById("content").style.display = "flex";

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
    Descriptions = [];
} else {
    Names = JSON.parse(KRZSStore.getItem("tasks")).names;
    Values = JSON.parse(KRZSStore.getItem("tasks")).values;
    Numbers = JSON.parse(KRZSStore.getItem("tasks")).numbers;
    Descriptions = JSON.parse(KRZSStore.getItem("tasks")).descriptions;
};
TempDesc = []
Names.forEach(function (element) {
    TempDesc.push("");
})
if (KRZSStore.getItem("tasks") != "{}") {
    if (Descriptions == undefined) {
        KRZSStore.setItem("tasks", JSON.stringify({
            "names": Names,
            "values": Values,
            "numbers": Numbers,
            "descriptions": TempDesc
        }));
        location.reload();
    }
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
    Descriptions.splice(indexnum, 1);
    KRZSStore.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers,
        "descriptions": Descriptions
    }));
    TasksCompleted = TasksCompleted+1;
    KRZSStore.setItem("taskscompleted", TasksCompleted);
};
function updateName(text, index) {
    Names.splice(new Number(index), 1, text);
    KRZSStore.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers,
        "descriptions": Descriptions
    }));
};
for (let index = 0; index < Names.length; index++) {
    createTask(Names[index], Values[index], false, Numbers[index], Descriptions[index])
}
document.getElementById("newtaskform").onsubmit = function () {
    event.preventDefault();
    document.querySelector("#taskcreate").disabled = true;
    document.querySelector("#taskcancel").disabled = true;
    document.querySelector("#taskpriority").disabled = true;
    document.querySelector(".modaloverlay").style.opacity = "0%";
    createTask(document.querySelector(".taskname").value, document.querySelector(".taskpriority").value, true, "", document.querySelector(".taskdesc").value)
    setTimeout(function () {
        document.querySelector(".modaloverlay").style.display = "none";
        document.querySelector(".taskmodal").style.display = "none";
        document.querySelector("#taskcreate").disabled = false;
        document.querySelector("#taskcancel").disabled = false;
        document.querySelector("#taskpriority").disabled = false;
        document.querySelector("#taskname").value = "";
        document.querySelector("#taskdesc").value = "";
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
        document.querySelector("#taskdesc").value = "";
        document.querySelector("#taskpriority").value = "75";
    }, 1100);
};
function createTask(txt, priority, storetask, id, desc) {
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () { btnClick() };
    var ptext = document.createElement("span");
    ptext.contentEditable = true;
    ptext.textContent = txt;
    if (priority == "75") {
        ptext.classList.add("normalpriority");
    } else if (priority == "100") {
        ptext.classList.add("highpriority");
    } else if (priority == "50") {
        ptext.classList.add("lowpriority");
    } else if (priority == "25") {
        ptext.classList.add("aipriority");
    } else {
        ptext.classList.add("debugpriority");
    };
    var descript = document.createElement("span");
    descript.textContent = desc;
    descript.classList.add("description");
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    pelem.appendChild(descript);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = priority;
    var randnum = document.createElement("randnum");
    if (id != "") {
        randnum.innerHTML = id;
    } else {
        randnum.innerHTML = Math.random()*10;
    }
    Nindex = Numbers.length;
    ptext.onblur = function(){updateName(event.target.textContent, Numbers.indexOf(event.target.parentElement.nextSibling.nextSibling.textContent.toString()))};
    ptext.onclick = function(){
        if (ShiftKeyDown) {
            event.target.parentElement.parentElement.remove();
            Numbers.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            Names.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            Values.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            Descriptions.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            KRZSStore.setItem("tasks", JSON.stringify({
                "names": Names,
                "values": Values,
                "numbers": Numbers,
                "descriptions": Descriptions
            }));
        }
    };
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    taskelem.appendChild(randnum);
    document.querySelector(".tasks").appendChild(taskelem);
    if (storetask) {
        Names.push(txt);
        Values.push(priority);
        Numbers.push(randnum.innerHTML);
        Descriptions.push(desc);
        KRZSStore.setItem("tasks", JSON.stringify({
            "names": Names,
            "values": Values,
            "numbers": Numbers,
            "descriptions": Descriptions
        }));
    }
}
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
    document.querySelector(".ai").style.display = "none";
    document.querySelector(".theme").style.display = "none";
    document.querySelector(".home").style.display = "block";
    document.querySelector("#tasksbutton").classList.remove("tabbedin");
    document.querySelector("#statsbutton").classList.remove("tabbedin");
    document.querySelector("#aibutton").classList.remove("tabbedin");
    document.querySelector("#themebutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.add("tabbedin");
};
function tasksTab() {
    document.querySelector(".statistics").style.display = "none";
    document.querySelector(".home").style.display = "none";
    document.querySelector(".ai").style.display = "none";
    document.querySelector(".theme").style.display = "none";
    document.querySelector(".content").style.display = "flex";
    document.querySelector("#statsbutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.remove("tabbedin");
    document.querySelector("#aibutton").classList.remove("tabbedin");
    document.querySelector("#themebutton").classList.remove("tabbedin");
    document.querySelector("#tasksbutton").classList.add("tabbedin");
};
function themeTab() {
    document.querySelector(".content").style.display = "none";
    document.querySelector(".home").style.display = "none";
    document.querySelector(".statistics").style.display = "none";
    document.querySelector(".ai").style.display = "none";
    document.querySelector(".theme").style.display = "flex";
    document.querySelector("#tasksbutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.remove("tabbedin");
    document.querySelector("#statsbutton").classList.remove("tabbedin");
    document.querySelector("#aibutton").classList.remove("tabbedin");
    document.querySelector("#themebutton").classList.add("tabbedin");
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
    document.querySelector(".home").style.display = "none";
    document.querySelector(".ai").style.display = "none";
    document.querySelector(".theme").style.display = "none";
    document.querySelector(".statistics").style.display = "block";
    document.querySelector("#tasksbutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.remove("tabbedin");
    document.querySelector("#aibutton").classList.remove("tabbedin");
    document.querySelector("#statsbutton").classList.add("tabbedin");
};
function aiTab() {
    document.querySelector(".content").style.display = "none";
    document.querySelector(".home").style.display = "none";
    document.querySelector(".statistics").style.display = "none";
    document.querySelector(".theme").style.display = "none";
    document.querySelector(".ai").style.display = "flex";
    document.querySelector("#tasksbutton").classList.remove("tabbedin");
    document.querySelector("#homebutton").classList.remove("tabbedin");
    document.querySelector("#statsbutton").classList.remove("tabbedin");
    document.querySelector("#themebutton").classList.remove("tabbedin");
    document.querySelector("#aibutton").classList.add("tabbedin");
};
function suggestTasks() {
    etg = event.target;
    etg.disabled = true;
    etg.firstChild.style.display = "inline-block";
    var xhr = new XMLHttpRequest();
    var url = "https://apiprox.krzs.workers.dev/blspecific/tasksuggest";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
            xhrresponse = JSON.parse(xhr.responseText).candidates[0].content.parts[0].text;
            JSON.parse(xhrresponse).forEach(function (e) {
                createTask(e, 25, true);
            })
            } catch {
                notify("There was an error upon trying to generate the AI task suggestions.")
            }
            etg.disabled = false;
            etg.firstChild.style.display = "none";
            tasksTab()
        }
    }
    var data = Names
    xhr.send(data);
}
AiChat = "AI: Hi, I'm Blueberry AI! How can I help you?";
function sendAiMessage() {
    var newelem = document.createElement("span");
    var belem = document.createElement("b");
    belem.textContent = localStorage.getItem("cookieusername") + ": ";
    newelem.appendChild(belem);
    var pelem = document.createElement("span");
    var pelemtxt = document.getElementById("aiinput").value;
    pelem.textContent = pelemtxt;
    newelem.appendChild(pelem);
    document.getElementById("chatbox").appendChild(newelem);
    AiChat = AiChat + "\n\nUser: " + pelemtxt + "\n\nAI: ";
    var xhr = new XMLHttpRequest();
    var url = "https://apiprox.krzs.workers.dev/blspecific/chatai";
    xhr.open("POST", url, true);
    document.getElementById("aiinput").disabled = true;
    document.getElementById("aiinput").value = "AI is thinking...";
    document.getElementById("aisubmitbtn").disabled = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                xhrresponse = JSON.parse(xhr.responseText).candidates[0].content.parts[0].text;
                var newelem = document.createElement("span");
                var belem = document.createElement("b");
                belem.textContent = "AI: ";
                newelem.appendChild(belem);
                var pelem = document.createElement("span");
                pelem.textContent = xhrresponse;
                newelem.appendChild(pelem);
                document.getElementById("chatbox").appendChild(newelem);
                document.getElementById("aiinput").disabled = false;
                document.getElementById("aiinput").value = "";
                document.getElementById("aisubmitbtn").disabled = false;
                AiChat = AiChat + xhrresponse;
            } catch {
                notify("There was an error upon trying to generate the AI's reponse.'")
            }
        }
    }
    var data = JSON.stringify({
        "tasks": Names,
        "timeline": AiChat
    });
    xhr.send(data);
}

// Colors
if (KRZSStore.getItem("themeColor1") != "{}") {
    document.getElementById("themeColor1").value = KRZSStore.getItem("themeColor1");
}
if (KRZSStore.getItem("themeColor2") != "{}") {
    document.getElementById("themeColor2").value = KRZSStore.getItem("themeColor2");
}
if (KRZSStore.getItem("themeColor3") != "{}") {
    document.getElementById("themeColor3").value = KRZSStore.getItem("themeColor3");
}
if (KRZSStore.getItem("themeColor4") != "{}") {
    document.getElementById("themeColor4").value = KRZSStore.getItem("themeColor4");
}
if (KRZSStore.getItem("themeColor5") != "{}") {
    document.getElementById("themeColor5").value = KRZSStore.getItem("themeColor5");
}
function themeColorChange(log, num) {
document.getElementById("stylecolors").textContent = `
body, html {
    background: ${document.getElementById("themeColor1").value};
}
.tasks {
    background: ${document.getElementById("themeColor2").value};
}
.task p span {
    color: ${document.getElementById("themeColor3").value};
}
.checkbox {
    border: 2px solid ${document.getElementById("themeColor3").value};
}
.main {
    color: ${document.getElementById("themeColor4").value};
}
.xpbar {
    outline: 3px solid ${document.getElementById("themeColor5").value};
}
.xpwidth {
    background: ${document.getElementById("themeColor5").value};
}
.xplevel {
    color: ${document.getElementById("themeColor5").value};
}
`
if (log != undefined) {
    KRZSStore.setItem("themeColor" + num, log);
}
}
themeColorChange()

// Fonts
if (KRZSStore.getItem("themeFont1") != "{}") {
    document.getElementById("themeFont1").value = KRZSStore.getItem("themeFont1");
}
if (KRZSStore.getItem("themeFont2") != "{}") {
    document.getElementById("themeFont2").value = KRZSStore.getItem("themeFont2");
}

function themeFontChange(log, num) {
document.getElementById("font1").href = `https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,400;0,700;1,400;1,700&family=${document.getElementById("themeFont1").value}&display=swap`
document.getElementById("font2").href = `https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,400;0,700;1,400;1,700&family=${document.getElementById("themeFont2").value}&display=swap`
document.getElementById("stylefonts").textContent = `
.menumain {
    font-family: '${document.getElementById("themeFont1").value}';
}
.task p span {
    font-family: '${document.getElementById("themeFont2").value}';
}
.xplevel {
    font-family: '${document.getElementById("themeFont1").value}';
}
.addnewtask {
    font-family: '${document.getElementById("themeFont2").value}';
}
`
if (log != undefined) {
    KRZSStore.setItem("themeFont" + num, log);
}
}
themeFontChange()