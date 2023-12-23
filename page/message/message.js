function loadMessage() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("message").children[1].innerHTML=''
            var list = JSON.parse(ajax.responseText);
            //console.log(list.main.slice(-1));

            //检查本地阅读记录
            var localRecord = localStorage.getItem("message-read")
            if (localRecord != list.main.length) {
                document.getElementById("home").children[1].insertAdjacentHTML("afterbegin", `
                <div class="app-info-text" style="font-size:18px" onclick="document.getElementById('home').children[1].children[0].remove()">
                <div style=" background: transparent;font-size:17px" ><i class="bi bi-chat-square-fill" style=" font-size:18px"></i>新发布于:${list.main[list.main.length - 1].date}</div>        
                ${list.main[list.main.length - 1].content}
                <span>单击隐藏</span>
                </div>
               `)
               document.getElementById("home-message-btn").style.border="solid rgba(255, 125, 0, 0.7) 3px"
                //同步记录
                localStorage.setItem("message-read",list.main.length)
            }

            //添加列表
            list.main.reverse().forEach(item => {
                document.getElementById("message").children[1].insertAdjacentHTML("beforeend", `<fieldset style="margin:5px auto">
                <legend style="font-size:18px">${item.date}</legend>
                <div style="font-size: 18px;">
                ${item.content}
                </div>
            </fieldset>`)
            })

        }
    }
    ajax.open("GET", "https://wannianqingshi.github.io/WatchAppStore/server/message-push.json", true);
    ajax.send();
}