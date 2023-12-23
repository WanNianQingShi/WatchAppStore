var on;

function outSearchResult(e) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("app-search-result").children[1].innerHTML = "";
            var list = JSON.parse(ajax.responseText);
            list = list.applist;
            var point = document.querySelectorAll(".app-search-input")[document.querySelectorAll(".app-search-input").length - 1].value

            if (point != "") {
                localStorage.setItem("search-history", point + "," + localStorage.getItem("search-history"))//保存到本地
                list.forEach(item => {
                    //var point = document.getElementById("app-search-input").innerHTML;
                    var str = JSON.stringify(item);
                    if (str.search(point) > -1) {

                        var btn = document.createElement('button');
                        btn.classList = "btn";
                        btn.setAttribute('value', str);
                        btn.innerHTML = `${item.name}<span>${item.version}</span>`;
                        btn.setAttribute("onclick", "openAppInfoPage(event)")
                        document.getElementById("app-search-result").children[1].appendChild(btn);
                    }

                })
                if (document.getElementById("app-search-result").children[1].innerHTML == "") {
                    document.getElementById("app-search-result").children[1].innerHTML = "没有搜索到结果";
                }
                clonePage('app-search-result')
                loadSearchHistory()
            }
            else {
                //加个弹窗提醒
            }

        }
    }
    ajax.open("GET", "https://wannianqingshi.github.io/WatchAppStore/server/app-list.json", true);
    ajax.send();

}

function loadSearchHistory() {
    var list = localStorage.getItem("search-history").split(",");
    document.querySelectorAll(".app-search-history").forEach(chi=>{chi.innerHTML='<legend>搜索历史</legend>'})
    //list = list.reverse();
    //list = list.slice(0, -1);
    if (list.length > 10) {
        list=list.slice(0,10)
        localStorage.setItem("search-history",list.toString())

    }
    //console.log(typeof (list));
    list.forEach(item => {
        var btnnode = document.createElement("button");
        btnnode.classList = "btn"
        btnnode.innerHTML = item
        btnnode.addEventListener("click", function () {
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    document.getElementById("app-search-result").children[1].innerHTML="";
                    var list = JSON.parse(ajax.responseText);
                    list = list.applist;
                    var point = item
                    if (point != "") {
                        list.forEach(item => {
                            //var point = document.getElementById("app-search-input").innerHTML;
                            var str = JSON.stringify(item);
                            if (str.search(point) > -1) {

                                var btn = document.createElement('button');
                                btn.classList = "btn";
                                btn.setAttribute('value', str);
                                btn.innerHTML = `${item.name}<span>${item.version}</span>`;
                                btn.setAttribute("onclick", "openAppInfoPage(event)")
                                document.getElementById("app-search-result").children[1].appendChild(btn);
                            }

                        })
                        if (document.getElementById("app-search-result").children[1].innerHTML == "") {
                            document.getElementById("app-search-result").children[1].innerHTML = "没有搜索到结果";
                        }
                        clonePage('app-search-result')
                    }
                    else {
                        //加个弹窗提醒
                    }

                }
            }
            ajax.open("GET", "https://wannianqingshi.github.io/WatchAppStore/server/app-list.json", true);
            ajax.send();
        })
        document.querySelectorAll(".app-search-history").forEach(node => { node.appendChild(btnnode) })
    })
}