CurDate = "";
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
    DueDates = [];
} else {
    Names = JSON.parse(KRZSStore.getItem("tasks")).names;
    Values = JSON.parse(KRZSStore.getItem("tasks")).values;
    Numbers = JSON.parse(KRZSStore.getItem("tasks")).numbers;
    Descriptions = JSON.parse(KRZSStore.getItem("tasks")).descriptions;
    DueDates = JSON.parse(KRZSStore.getItem("tasks")).duedates;
};
TempDesc = []
TempDue = []
Names.forEach(function () {
    TempDesc.push("");
})
Names.forEach(function () {
    TempDue.push("");
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
    if (DueDates == undefined) {
        KRZSStore.setItem("tasks", JSON.stringify({
            "names": Names,
            "values": Values,
            "numbers": Numbers,
            "descriptions": Descriptions,
            "duedates": TempDue
        }));
        location.reload();
    }
};
function playSound(soundFile) {
    try {
        const audio = new Audio(soundFile);
        audio.play();
    } catch {}
}
function removeItem(item) {
    setTimeout(function () {item.remove();},1500);
};
function btnClick(priority) {
    event.target.disabled = true;
    Parenttarget = event.target.parentElement.parentElement;
    addXp(event.target.parentElement.parentElement.firstChild.nextSibling.innerHTML, priority);
    event.target.parentElement.parentElement.style.opacity = "0%";
    removeItem(event.target.parentElement.parentElement);
    var indexnum = Numbers.indexOf(event.target.parentElement.parentElement.firstChild.nextSibling.nextSibling.innerHTML);
    Numbers.splice(indexnum, 1);
    Names.splice(indexnum, 1);
    Values.splice(indexnum, 1);
    Descriptions.splice(indexnum, 1);
    DueDates.splice(indexnum, 1);
    KRZSStore.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers,
        "descriptions": Descriptions,
        "duedates": DueDates
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
        "descriptions": Descriptions,
        "duedates": DueDates
    }));
};
ShiftKeyDown = false;
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 16) {
        ShiftKeyDown = true;
    }
});
document.addEventListener("keyup", (event) => {
    if (event.keyCode === 16) {
        ShiftKeyDown = false;
    }
});
for (let index = 0; index < Names.length; index++) {
    createTask(Names[index], Values[index], false, Numbers[index], Descriptions[index], DueDates[index])
}
document.getElementById("newtaskform").onsubmit = function () {
    event.preventDefault();
    document.querySelector("#taskcreate").disabled = true;
    document.querySelector("#taskcancel").disabled = true;
    document.querySelector("#taskpriority").disabled = true;
    document.querySelector(".modaloverlay").style.opacity = "0%";
    if (document.querySelector(".taskdue").value != CurDate) {
        createTask(document.querySelector(".taskname").value, document.querySelector(".taskpriority").value, true, "", document.querySelector(".taskdesc").value, document.querySelector(".taskdue").value)
    } else {
        createTask(document.querySelector(".taskname").value, document.querySelector(".taskpriority").value, true, "", document.querySelector(".taskdesc").value, "")
    }
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
function convertToDateTimeLocalString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
document.querySelector(".addnewtask").onclick = function () {
    CurDate = convertToDateTimeLocalString(new Date());
    document.getElementById("taskdue").value = CurDate;
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
function createTask(txt, priority, storetask, id, desc, duedate) {
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () { btnClick(priority) };
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
    JokeInputs = ["zakem is a femboy", "zakem is not a femboy", "owo", "uwu", "ios > android", "i use a mac", "this software is so buggy", "is zakem a girl or a boy"]
    JokeOutputs = ["no", "yes thats true", "what's this", "awww~ uwu to you too!", "THIS IS A GOOD OPINION", "I LOVE YOUUU (platonically)", "ikr", "zakem is a gi- I mean boy...I mean... uh... i cant tell, his pronouns are set to any... hmm... you decide."]
    if (JokeInputs.indexOf(txt) != -1) {
        descript.textContent = JokeOutputs[JokeInputs.indexOf(txt)];
    }
    descript.classList.add("description");
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    pelem.appendChild(descript);
    if (duedate != "") {
        var duedateelem = document.createElement("span");
        var countDownDate = new Date(duedate).getTime();
        var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        duedateelem.textContent = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
        if (distance < 0) {
            clearInterval(x);
            duedateelem.classList.add("dateexpire");
            duedateelem.textContent = "Task is due.";
        }
        }, 1000);
        duedateelem.classList.add("ddateitem");
        pelem.appendChild(duedateelem);
    }
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
            DueDates.splice(Numbers.indexOf((new Number(event.target.parentElement.nextSibling.nextSibling.textContent)+1).toString()), 1);
            KRZSStore.setItem("tasks", JSON.stringify({
                "names": Names,
                "values": Values,
                "numbers": Numbers,
                "descriptions": Descriptions,
                "duedates": DueDates
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
        DueDates.push(duedate);
        KRZSStore.setItem("tasks", JSON.stringify({
            "names": Names,
            "values": Values,
            "numbers": Numbers,
            "descriptions": Descriptions,
            "duedates": DueDates
        }));
    }
}
function addXp(amount, priority) {
    CurrentXp = CurrentXp + new Number(amount);
    XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
    if (XpToNextLevel <= 0) {
        playSound("/assets/sfx/levelup.mp3");
        CurrentLevel = CurrentLevel + 1;
        CurrentXp = Math.abs(XpToNextLevel);
        XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
        document.querySelector(".xplevel").textContent = CurrentLevel;
    } else {
        playSound("/assets/sfx/complete.mp3");
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
function statisticsTab() {
    playSound("/assets/sfx/openmenu.mp3");
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
    EvTarget = event.target
    EvTarget.disabled = true;
    document.querySelector(".statistics").style.position = "fixed";
    if(document.documentElement.scrollWidth > 950){document.querySelector(".statistics").style.right = "-50%";}else{document.querySelector(".statistics").style.right = "-100%";};
    document.querySelector(".statistics").style.display = "block";
    setTimeout(function(){document.querySelector(".statistics").style.right = "0"},100);
    setTimeout(function(){document.querySelector(".statistics").style.position = "absolute";EvTarget.disabled = false;},1100);
};
function closeStatisticsTab() {
    playSound("/assets/sfx/closemenu.mp3");
    EvTarget = event.target;
    EvTarget.disabled = true;
    document.querySelector(".statistics").style.position = "fixed";
    setTimeout(function(){if(document.documentElement.scrollWidth > 950){document.querySelector(".statistics").style.right = "-50%"}else{document.querySelector(".statistics").style.right = "-100%"}},100);
    setTimeout(function(){document.querySelector(".statistics").style.position = "absolute";document.querySelector(".statistics").style.display = "none";EvTarget.disabled = false;},1100);
};
function aiTab() {
    playSound("/assets/sfx/openmenu.mp3");
    EvTarget = event.target
    EvTarget.disabled = true;
    document.querySelector(".ai").style.position = "fixed";
    if(document.documentElement.scrollWidth > 950){document.querySelector(".ai").style.right = "-50%";}else{document.querySelector(".ai").style.right = "-100%";};
    document.querySelector(".ai").style.display = "flex";
    setTimeout(function(){document.querySelector(".ai").style.right = "0"},100);
    setTimeout(function(){document.querySelector(".ai").style.position = "absolute";EvTarget.disabled = false;},1100);
};
function closeAiTab() {
    playSound("/assets/sfx/closemenu.mp3");
    EvTarget = event.target;
    EvTarget.disabled = true;
    document.querySelector(".ai").style.position = "fixed";
    setTimeout(function(){if(document.documentElement.scrollWidth > 950){document.querySelector(".ai").style.right = "-50%"}else{document.querySelector(".ai").style.right = "-100%"}},100);
    setTimeout(function(){document.querySelector(".ai").style.position = "absolute";document.querySelector(".ai").style.display = "none";EvTarget.disabled = false;},1100);
};
function themeTab() {
    playSound("/assets/sfx/openmenu.mp3");
    EvTarget = event.target
    EvTarget.disabled = true;
    document.querySelector(".theme").style.position = "fixed";
    if(document.documentElement.scrollWidth > 950){document.querySelector(".theme").style.right = "-50%";}else{document.querySelector(".theme").style.right = "-100%";};
    document.querySelector(".theme").style.display = "flex";
    setTimeout(function(){document.querySelector(".theme").style.right = "0"},100);
    setTimeout(function(){document.querySelector(".theme").style.position = "absolute";EvTarget.disabled = false;},1100);
};
function closeThemeTab() {
    playSound("/assets/sfx/closemenu.mp3");
    EvTarget = event.target;
    EvTarget.disabled = true;
    document.querySelector(".theme").style.position = "fixed";
    setTimeout(function(){if(document.documentElement.scrollWidth > 950){document.querySelector(".theme").style.right = "-50%"}else{document.querySelector(".theme").style.right = "-100%"}},100);
    setTimeout(function(){document.querySelector(".theme").style.position = "absolute";document.querySelector(".theme").style.display = "none";EvTarget.disabled = false;},1100);
};
function notify(text) {
    playSound("/assets/sfx/notif.mp3");
    var notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = text;
    document.body.insertBefore(notification, document.body.firstChild);
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
}
// Back to the main code!
document.addEventListener('mousemove', function (e) {
    document.getElementById("tooltip").style.top = e.clientY - 15 + "px";
}, false);
function suggestTasks() {
    etg = event.target;
    etg.disabled = true;
    etg.firstChild.style.display = "inline-block";
    var xhr = new XMLHttpRequest();
    var url = "https://apiprox.krzs.workers.dev/blspecific/tasksuggest";
    xhr.open("POST", url, true);
    playSound("/assets/sfx/aito.mp3");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
            xhrresponse = JSON.parse(xhr.responseText).candidates[0].content.parts[0].text;
            JSON.parse(xhrresponse).forEach(function (e) {
                playSound("/assets/sfx/aifrom.mp3");
                createTask(e, 25, true);
            })
            } catch {
                notify("There was an error upon trying to generate the AI task suggestions.")
            }
            etg.disabled = false;
            etg.firstChild.style.display = "none";
        }
    }
    var data = Names
    xhr.send(data);
}
AiChat = "AI: Hi, I'm Blueberry AI! How can I help you?";
function sendAiMessage() {
    playSound("/assets/sfx/aito.mp3");
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
                playSound("/assets/sfx/aifrom.mp3");
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
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
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
.task {
    border-bottom: 1px solid ${hexToRGB(document.getElementById("themeColor3").value,0.2)};
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
.copyright {
    background: ${document.getElementById("themeColor2").value};
    color: ${document.getElementById("themeColor3").value};
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
.main {
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
.copyright {
    font-family: '${document.getElementById("themeFont2").value}';
}
`
if (log != undefined) {
    KRZSStore.setItem("themeFont" + num, log);
}
}
themeFontChange()