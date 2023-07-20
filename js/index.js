var package;
window.oncontextmenu = function (e) {
    e.preventDefault();
}

window.onload = function () {
    initialize();
    menuPervent();
    loadAppList();
    //循化执行getTime()
    setInterval(getTime(), 1000);
    //App Debug Region
    
    //clonePage("download-progress")

    //

}

function initialize() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

            package = JSON.parse(ajax.responseText);
            //初次加载时执行
            setAppInfo();
            setDispalyLayout()
            //document.getElementById("version").children[1].innerHTML = package.version;
        }
    }
    ajax.open("GET", "./data/package.json", true);
    ajax.send();
}

function setAppInfo() {
    //当应用首次打开是执行
    console.log(package)
    echoid("app-name", package.appname)
}

function setDispalyLayout() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var headh = package.headHeight;
    document.getElementById("home").style.height = h * 0.95 + "px";
    document.getElementById("head").style.height = headh * 100 + "%";
    document.getElementById("home-body").style.height = (1 - headh) * 100 + "%";

    document.querySelectorAll(".page").forEach(function (item) {
        item.style.height = h * 0.95 + "px";
    })
    document.querySelectorAll(".page-head").forEach(function (item) {
        item.style.height = headh * 100 + "%";
    })
    document.querySelectorAll(".page-body").forEach(function (item) {
        item.style.height = (1 - headh) * 100 + "%"});

    //当class为page-name的元素被点击时删除父级元素

}

function menuPervent() {
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length >= 2) {
            event.preventDefault();
        }
    })
    document.addEventListener('touchmove', function (event) {
        if (event.touches.length >= 2) {
            event.preventDefault();
        }
    })
    document.addEventListener('touchend', function (event) {
        if (event.touches.length >= 2) {
            event.preventDefault();
        }
    })
}

function clonePage(id) {
    var page = document.getElementById(id);
    var clone = page.cloneNode(true);
    clone.style.display = "block";
    //clone.style.animation="page-appear";
    document.body.appendChild(clone);
    document.querySelectorAll(".page-name").forEach(function (item) {
        item.addEventListener("click", function () {
            //点击page-name是关闭该页面
            item.parentElement.parentElement.style.left="120%"
            setTimeout(function () {item.parentElement.parentElement.remove();}, 350);
            

        })
    })

}

function getTime(){
    var time=new Date;
    var h = time.getHours();
    var min=time.getMinutes();
    if(h<10){h=`0${h}`}
    if(min<10){min=`0${min}`}
    var out=h+":"+min;
    echoid("time", out);
}

function echoid(id, string) {
    document.getElementById(id).innerHTML = string;
}

function preventEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
}