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
};
if (localStorage.getItem("taskscompleted") == null) {
    TasksCompleted = 0;
} else {
    TasksCompleted = new Number(localStorage.getItem("taskscompleted"));
};
if (localStorage.getItem("timeonline") == null) {
    TimeOnline = 0;
} else {
    TimeOnline = new Number(localStorage.getItem("timeonline"));
};
if (localStorage.getItem("tasks") == null) {
    Names = [];
    Values = [];
    Numbers = [];
} else {
    Names = JSON.parse(localStorage.getItem("tasks")).names;
    Values = JSON.parse(localStorage.getItem("tasks")).values;
    Numbers = JSON.parse(localStorage.getItem("tasks")).numbers;
};
if (localStorage.getItem("customrewards") == null) {
    RewardNames = [];
    RewardLevels = [];
    RewardNumbers = [];
    localStorage.setItem("customrewards", JSON.stringify({
        "names": [],
        "levels": [],
        "numbers": []
    }));
} else {
    RewardNames = JSON.parse(localStorage.getItem("customrewards")).names;
    RewardLevels = JSON.parse(localStorage.getItem("customrewards")).levels;
    RewardNumbers = JSON.parse(localStorage.getItem("customrewards")).numbers;
};
for (let index = 0; index < JSON.parse(localStorage.getItem("customrewards")).names.length; index++) {
    var newelem = document.createElement("li");
    var newspan = document.createElement("span");
    var randnum = document.createElement("randnum");
    randnum.innerHTML = RewardNumbers[index];
    newspan.classList.add("menutext");
    newspan.textContent = RewardNames[index];
    newelem.appendChild(newspan);
    document.querySelector(".menuul").appendChild(newelem);
    newelem.appendChild(randnum);
}
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
    localStorage.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
    TasksCompleted = TasksCompleted+1;
    localStorage.setItem("taskscompleted", TasksCompleted);
};
function updateName(text, index) {
    Names.splice(new Number(index), 1, text);
    localStorage.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
};
for (let index = 0; index < Names.length; index++) {
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
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
    } else {
        ptext.classList.add("debugpriority");
    };
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = Values[index];
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Numbers[index];
    ptext.onkeyup = function(){updateName(event.target.textContent, Numbers.indexOf(event.target.parentElement.nextSibling.nextSibling.textContent.toString()))};
    ptext.onclick = function(){if(event.shiftKey){event.target.parentElement.parentElement.remove()}};
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
    } else {
        ptext.classList.add("debugpriority");
    }
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = document.querySelector(".taskpriority").value;
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Math.random()*10;
    Nindex = Numbers.length;
    ptext.oninput = function(){updateName(event.target.textContent, Numbers.indexOf(event.target.parentElement.nextSibling.nextSibling.textContent.toString()))};
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    taskelem.appendChild(randnum);
    document.querySelector(".tasks").appendChild(taskelem);
    Names.push(document.querySelector("#taskname").value);
    Values.push(document.querySelector("#taskpriority").value);
    Numbers.push(randnum.innerHTML);
    document.querySelector(".modaloverlay").style.opacity = "0%";
    localStorage.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
    setTimeout(function () {
        document.querySelector(".modaloverlay").style.display = "none";
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
        document.querySelector(".confetti").style.display = "block";
        setTimeout(function () {document.querySelector(".confetti").style.display = "none"},2000);
        activateRewardOne(CurrentLevel);
    } else {
        activateRewardTwo(event.target.parentElement.textContent);
    }
    document.querySelector(".xpwidth").style.width = (CurrentXp*100)/(5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90) + "%";
    localStorage.setItem("level", CurrentLevel);
    localStorage.setItem("xp", CurrentXp);
}
function dataClear() {
    if (confirm("You are about to clear all the website data.\n\nThis includes XP, levels, tasks, customization settings, and statistics. Are you sure you want to do this?")) {
        localStorage.clear();
        alert("All cleared!");
        location.reload();
    };
};
setInterval(function () {
    TimeOnline = TimeOnline+0.1;
    localStorage.setItem("timeonline", TimeOnline)
},100);
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
    document.querySelector("#stats4").textContent = Math.ceil((TimeOnline/60/60) * 100) / 100;
    EvTarget = event.target
    EvTarget.disabled = true;
    document.querySelector(".statistics").style.position = "fixed";
    if(document.documentElement.scrollWidth > 950){document.querySelector(".statistics").style.right = "-50%";}else{document.querySelector(".statistics").style.right = "-100%";};
    document.querySelector(".statistics").style.display = "block";
    setTimeout(function(){document.querySelector(".statistics").style.right = "0"},100);
    setTimeout(function(){document.querySelector(".statistics").style.position = "absolute";EvTarget.disabled = false;},1100);
};
function closeStatisticsTab() {
    EvTarget = event.target;
    EvTarget.disabled = true;
    document.querySelector(".statistics").style.position = "fixed";
    setTimeout(function(){if(document.documentElement.scrollWidth > 950){document.querySelector(".statistics").style.right = "-50%"}else{document.querySelector(".statistics").style.right = "-100%"}},100);
    setTimeout(function(){document.querySelector(".statistics").style.position = "absolute";document.querySelector(".statistics").style.display = "none";EvTarget.disabled = false;},1100);
};
function closeCustomRewardsTab() {
    EvTarget = event.target;
    EvTarget.disabled = true;
    document.querySelector(".customrewards").style.position = "fixed";
    setTimeout(function(){if(document.documentElement.scrollWidth > 950){document.querySelector(".customrewards").style.right = "-50%"}else{document.querySelector(".customrewards").style.right = "-100%"}},100);
    setTimeout(function(){document.querySelector(".customrewards").style.position = "absolute";document.querySelector(".customrewards").style.display = "none";EvTarget.disabled = false;},1100);
};
function customRewardsTab() {
    EvTarget = event.target
    EvTarget.disabled = true;
    document.querySelector(".customrewards").style.position = "fixed";
    if(document.documentElement.scrollWidth > 950){document.querySelector(".customrewards").style.right = "-50%";}else{document.querySelector(".customrewards").style.right = "-100%";};
    document.querySelector(".customrewards").style.display = "block";
    setTimeout(function(){document.querySelector(".customrewards").style.right = "0"},100);
    setTimeout(function(){document.querySelector(".customrewards").style.position = "absolute";EvTarget.disabled = false;},1100);
};
document.querySelector("#addreward").onclick = function () {
    document.querySelector(".rewardmodal").style.display = "block";
    document.querySelector(".modaloverlay").style.display = "flex";
    setTimeout(function () {document.querySelector(".modaloverlay").style.opacity = "100%";},100);
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
    newspan.textContent = document.querySelector("#rewardname").value;
    newelem.appendChild(newspan);
    document.querySelector(".menuul").appendChild(newelem);
    newelem.appendChild(randnum);
    RewardNames.push(document.querySelector("#rewardname").value);
    RewardLevels.push(document.querySelector("#rewardlevel").value);
    RewardNumbers.push(randnum.innerHTML);
    localStorage.setItem("customrewards", JSON.stringify({
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
    audio.src = "/assets/sounds/notification.ogg";
    audio.currentTime = 0;
    audio.play();
    setTimeout(function () {
        notification.remove();
    },5000);
};
// Rewards
if (JSON.parse(localStorage.getItem("rewards")) == undefined) {
    localStorage.setItem("rewards", JSON.stringify({}));
};
function rewardsTab() {
    EvTarget = event.target;
    EvTarget.disabled = true;
    document.querySelector(".rewards").style.position = "fixed";
    if(document.documentElement.scrollWidth > 950){document.querySelector(".rewards").style.right = "-50%";}else{document.querySelector(".rewards").style.right = "-100%";};
    document.querySelector(".rewards").style.display = "block";
    setTimeout(function(){document.querySelector(".rewards").style.right = "0"},100);
    setTimeout(function(){document.querySelector(".rewards").style.position = "absolute";EvTarget.disabled = false;},1100);
};
function closeRewardsTab() {
    EvTarget = event.target;
    EvTarget.disabled = true;
    document.querySelector(".rewards").style.position = "fixed";
    setTimeout(function(){if(document.documentElement.scrollWidth > 950){document.querySelector(".rewards").style.right = "-50%"}else{document.querySelector(".rewards").style.right = "-100%"}},100);
    setTimeout(function(){document.querySelector(".rewards").style.position = "absolute";document.querySelector(".rewards").style.display = "none";EvTarget.disabled = false;},1100);
};
// Reward 1
if (JSON.parse(localStorage.getItem("rewards")).reward1 == undefined) {
    LevelupCongratulator = "Congrats, you leveled up!";
    localStorage.setItem("rewards", JSON.stringify({
        reward1: "Congrats, you leveled up!",
        reward1enabled: false,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled,
        reward3: JSON.parse(localStorage.getItem("rewards")).reward3,
        reward4: JSON.parse(localStorage.getItem("rewards")).reward4
    }));
} else {
    LevelupCongratulator = JSON.parse(localStorage.getItem("rewards")).reward1;
};
function changeRewardOne() {
    var prompttext = prompt('What would you like your levelup message to be? If you want to be fancy, it will replace "%s" with the acquired level.', LevelupCongratulator);
    if (prompttext != null) {
        LevelupCongratulator = prompttext;
        localStorage.setItem("rewards", JSON.stringify({
            reward1: LevelupCongratulator,
            reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
            reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
            reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled,
            reward3: JSON.parse(localStorage.getItem("rewards")).reward3,
            reward4: JSON.parse(localStorage.getItem("rewards")).reward4
        }));
        document.querySelector("#rewards1message").textContent = LevelupCongratulator;
    };
};
function activateRewardOne(levelnum) {
    if (RewardLevels.indexOf(CurrentLevel.toString()) != -1) {
        notify("Congrats, you've unlocked the award " + document.querySelector(".menuul").children[RewardLevels.indexOf(CurrentLevel.toString())].firstChild.textContent);
        document.querySelector(".menuul").children[RewardLevels.indexOf(CurrentLevel.toString())].remove();
        RewardNames.splice(RewardLevels.indexOf(CurrentLevel.toString()), 1);
        RewardLevels.splice(RewardLevels.indexOf(CurrentLevel.toString()), 1);
        RewardNumbers.splice(RewardLevels.indexOf(CurrentLevel.toString()), 1);
        localStorage.setItem("customrewards", JSON.stringify({
            "names": RewardNames,
            "levels": RewardLevels,
            "numbers": RewardNumbers
        }));
        rewardinter = setInterval(function () {
            if (RewardLevels.indexOf(CurrentLevel.toString()) != -1) {
                notify("Congrats, you've unlocked the reward " + document.querySelector(".menuul").children[RewardLevels.indexOf(CurrentLevel.toString())].firstChild.textContent + "!");
                document.querySelector(".menuul").children[RewardLevels.indexOf(CurrentLevel.toString())].remove();
                RewardNames.splice(RewardLevels.indexOf(CurrentLevel.toString()), 1);
                RewardLevels.splice(RewardLevels.indexOf(CurrentLevel.toString()), 1);
                RewardNumbers.splice(RewardLevels.indexOf(CurrentLevel.toString()), 1);
                localStorage.setItem("customrewards", JSON.stringify({
                    "names": RewardNames,
                    "levels": RewardLevels,
                    "numbers": RewardNumbers
                }));
            } else {
                clearInterval(rewardinter);
            }
        },5000);
    } else {
        if (document.querySelector("#reward1").checked == true) {
            var msg = new SpeechSynthesisUtterance();
            msg.text = LevelupCongratulator.replace(/%s/gi, levelnum);
            window.speechSynthesis.speak(msg);
        } else {
            var audio = document.querySelector("audio");
            audio.src = "/assets/sounds/levelup.ogg";
            audio.currentTime = 0;
            audio.play();
        };
    }
};
document.querySelector("#reward1").onchange = function () {
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: event.target.checked,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled,
        reward3: JSON.parse(localStorage.getItem("rewards")).reward3,
        reward4: JSON.parse(localStorage.getItem("rewards")).reward4
    }));
};
document.querySelector("#rewards1message").textContent = LevelupCongratulator;
document.querySelector("#reward1").checked = JSON.parse(localStorage.getItem("rewards")).reward1enabled;
// Reward 2
if (JSON.parse(localStorage.getItem("rewards")).reward2 == undefined) {
    TaskCongratulator = "Congrats, you completed a task!";
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
        reward2: TaskCongratulator,
        reward2enabled: false,
        reward3: JSON.parse(localStorage.getItem("rewards")).reward3,
        reward4: JSON.parse(localStorage.getItem("rewards")).reward4
    }));
} else {
    TaskCongratulator = JSON.parse(localStorage.getItem("rewards")).reward2;
};
function changeRewardTwo() {
    var prompttext = prompt('What would you like your task completion message to be? If you want to be fancy, it will replace "%t" with the acquired level.', TaskCongratulator);
    if (prompttext != null) {
        TaskCongratulator = prompttext;
        localStorage.setItem("rewards", JSON.stringify({
            reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
            reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
            reward2: TaskCongratulator,
            reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled,
            reward3: JSON.parse(localStorage.getItem("rewards")).reward3,
            reward4: JSON.parse(localStorage.getItem("rewards")).reward4
        }));
        document.querySelector("#rewards2message").textContent = TaskCongratulator;
    };
};
function activateRewardTwo(levelnum) {
    if (document.querySelector("#reward2").checked == true) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = TaskCongratulator.replace(/%t/gi, levelnum);
        window.speechSynthesis.speak(msg);
    } else {
        var audio = document.querySelector("audio");
        audio.src = "/assets/sounds/complete.ogg";
        audio.currentTime = 0;
        audio.play();
    }
}
document.querySelector("#reward2").onchange = function () {
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: event.target.checked,
        reward3: JSON.parse(localStorage.getItem("rewards")).reward3,
        reward4: JSON.parse(localStorage.getItem("rewards")).reward4
    }));
};
document.querySelector("#rewards2message").textContent = TaskCongratulator;
document.querySelector("#reward2").checked = JSON.parse(localStorage.getItem("rewards")).reward2enabled;
// Reward 3
if (JSON.parse(localStorage.getItem("rewards")).reward3 == undefined) {
    ThemeColors = ["#0c1327", "#c8ff00", "#000000", "#ffffff", "#00af00", "#00ff00"];
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled,
        reward3: ThemeColors,
        reward4: JSON.parse(localStorage.getItem("rewards")).reward4
    }));
} else {
    ThemeColors = JSON.parse(localStorage.getItem("rewards")).reward3;
    rewardThreeStyleTag();
    document.querySelector("#reward3-1").value = ThemeColors[0];
    document.querySelector("#reward3-2").value = ThemeColors[1];
    document.querySelector("#reward3-3").value = ThemeColors[2];
    document.querySelector("#reward3-4").value = ThemeColors[3];
    document.querySelector("#reward3-5").value = ThemeColors[4];
    document.querySelector("#reward3-6").value = ThemeColors[5];
};
function rewardThreeStyleTag() {
    document.getElementById("stylecolors").textContent = `
    body, html {
        background: ${ThemeColors[0]};
    }
    .tasks {
        background: ${ThemeColors[1]};
    }
    span {
        color: ${ThemeColors[2]};
    }
    .checkbox {
        border: 2px solid ${ThemeColors[2]};
    }
    .main {
        color: ${ThemeColors[3]};
    }
    .buttonmenu {
        color: ${ThemeColors[3]};
    }
    .xpbar {
        outline: 3px solid ${ThemeColors[4]};
    }
    .xpwidth {
        background: ${ThemeColors[4]};
    }
    .xplevel {
        color: ${ThemeColors[5]};
    }
    .minibutton {
        color: ${ThemeColors[3]};
    }
    `
}
function changeRewardThree(colorrule, rulecolor) {
    ThemeColors.splice(colorrule-1, 1, rulecolor);
    rewardThreeStyleTag();
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled,
        reward3: ThemeColors,
        reward4: JSON.parse(localStorage.getItem("rewards")).reward4
    }));
};
// Reward 4
if (JSON.parse(localStorage.getItem("rewards")).reward4 === undefined) {
    ThemeFonts = ["IBM Plex Mono", "Press Start 2P"];
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled,
        reward3: JSON.parse(localStorage.getItem("rewards")).reward3,
        reward4: ThemeFonts
    }));
} else {
    ThemeFonts = JSON.parse(localStorage.getItem("rewards")).reward4;
    rewardFourStyleTag();
    document.querySelector("#reward4-1").value = ThemeFonts[0];
    document.querySelector("#reward4-2").value = ThemeFonts[1];
};
function rewardFourStyleTag() {
    document.getElementById("stylefonts").textContent = `
    h1, h2, h3, h4, h5, h6 {
        font-family: '${ThemeFonts[1]}';
    }
    p {
        font-family: '${ThemeFonts[0]}';
    }
    span {
        font-family: '${ThemeFonts[0]}';
    }
    .xplevel {
        font-family: '${ThemeFonts[1]}';
    }
    .addnewtask {
        font-family: '${ThemeFonts[0]}';
    }
    .minibutton {
        font-family: '${ThemeFonts[0]}';
    }
    `
    document.getElementById("font1").href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(ThemeFonts[0])}:ital,wght@0,400;0,700;1,400;1,700&display=swap`;
    document.getElementById("font2").href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(ThemeFonts[1])}&display=swap`;
}
function changeRewardFour(fontrule, rulefont) {
    ThemeFonts.splice(fontrule-1, 1, rulefont);
    rewardFourStyleTag();
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled,
        reward3: JSON.parse(localStorage.getItem("rewards")).reward3,
        reward4: ThemeFonts
    }));
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