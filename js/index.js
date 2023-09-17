var package;
window.oncontextmenu = function (e) {
    e.preventDefault();
}

window.onload = function () {
    initialize();
    menuPervent();
    getTime()
    //setRightSlideClosePage();

    var GT=setInterval(getTime, 2000);
    var LSH=setInterval(loadSearchHistory, 1000);
    //setInterval(addMDUI(), 2000);   
    addEmptyBox()
    //getExpandList();

    //App Debug Region

    //clonePage("option")

    //

}

function addMDUI(){
    document.querySelectorAll("button").forEach(item => item.classList.add("mdui-ripple","mdui-ripple-blue"));
    document.querySelectorAll(".app-info-text").forEach(item => item.classList.add("mdui-ripple","mdui-ripple-blue"))

}


function setRightSlideClosePage() {
    var startX = 0; // 记录鼠标开始位置的X坐标

    document.onmousedown = function (downEvent) {
        var pages = document.querySelectorAll(".page");
        var currentPage = pages[pages.length - 1];

        if (downEvent.clientX < document.documentElement.clientWidth * 0.1 && currentPage.style.display === "block") {
            startX = downEvent.clientX;

            document.onmousemove = function (moveEvent) {
                var deltaX = moveEvent.clientX - startX;
                currentPage.style.marginLeft = deltaX + "px";
                
            };

            document.onmouseup = function (upEvent) {
                var deltaXRounded = upEvent.clientX - startX;
                var threshold = document.documentElement.clientWidth * 0.5;

                if (deltaXRounded >= threshold) {
                    currentPage.style.marginLeft = "100%";
                    setTimeout(function () {
                        currentPage.remove();
                    }, 500); 
                } else {
                    currentPage.style.marginLeft = "2.5%";
                }

                document.onmousemove = null; // 清除mousemove事件
                document.onmouseup = null; // 清除mouseup事件
            };
        }
    };
}

function initialize() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

            package = JSON.parse(ajax.responseText);
            //初次加载时执行
            setAppInfo();
            setDispalyLayout();
            loadMessage();
            loadAppList();
            
            
        }
    }
    ajax.open("GET", "./data/package.json", true);
    ajax.send();
}

function setAppInfo() {
    //当应用首次打开是执行
    console.log(package)
    echoid("app-name", package.appname)
    document.getElementById("about-version").innerHTML=package.version
}

function setDispalyLayout() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var headh = package.headHeight;
    document.getElementById("home").style.height = h * 1 + "px";
    document.getElementById("head").style.height = headh * 100 + "%";
    document.getElementById("home-body").style.height = (1 - headh) * 100 + "%";

    document.querySelectorAll(".page").forEach(function (item) {
        item.style.height = h * 1 + "px";
    })
    document.querySelectorAll(".page-head").forEach(function (item) {
        item.style.height = headh * 100 + "%";
    })
    document.querySelectorAll(".page-body").forEach(function (item) {
        item.style.height = (1 - headh) * 100 + "%"
    });

    //当class为page-name的元素被点击时删除父级元素

}

function menuPervent() {
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
    // document.addEventListener('touchstart', function (event) {
    //     if (event.touches.length >= 2) {
    //         event.preventDefault();
    //     }
    // })
    // document.addEventListener('touchmove', function (event) {
    //     if (event.touches.length >= 2) {
    //         event.preventDefault();
    //     }
    // })
    // document.addEventListener('touchend', function (event) {
    //     if (event.touches.length >= 2) {
    //         event.preventDefault();
    //     }
    // })
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
            item.parentElement.parentElement.style.left = "120%"
            setTimeout(function () { item.parentElement.parentElement.remove(); }, 350);


        })
    })

}
function addEmptyBox(){
    document.querySelectorAll(".page").forEach(item=>{
        item.children[1].insertAdjacentHTML("beforeend",`<div class="empty-box"></div>`)
    })
}

function getTime() {
    var time = new Date;
    var h = time.getHours();
    var min = time.getMinutes();
    if (h < 10) { h = `0${h}` }
    if (min < 10) { min = `0${min}` }
    var out = h + ":" + min;
    echoid("time", out);
}

function echoid(id, string) {
    document.getElementById(id).innerHTML = string;
}

function preventEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
    // 显示音乐播放小程序的函数
function showMusic() {
    // 在这里编写显示音乐播放小程序的代码
    // 可以使用微信小程序的 API 实现音乐播放功能
}

// 显示H5浏览器小程序的函数
function showH5() {
    // 在这里编写显示H5浏览器小程序的代码
    // 可以使用微信小程序的 API 实现H5页面的跳转或嵌入
}

// 显示播放B站链接视频的函数
function showBilibili() {
    // 在这里编写显示播放B站链接视频的代码
    // 可以使用微信小程序的 API 实现视频播放功能，例如使用微信小程序提供的video组件或使用第三方库实现视频播放功能
}
}
