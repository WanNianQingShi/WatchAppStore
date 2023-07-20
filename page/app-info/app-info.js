function outAppOtherVersionResult() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("app-search-result").children[1].innerHTML = "";
            var point=document.getElementById("app-info-name").innerHTML;
            var list = JSON.parse(ajax.responseText);
            list = list.applist;

            if (point != "") {
                list.forEach(item => {
                    var str = JSON.stringify(item)
                   
                    if (JSON.stringify(item.name).search(point) > -1) {

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
    ajax.open("GET", "server/app-list.json", true);
    ajax.send();
}