function getExpandList() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            /* console.log(ajax.responseText); */
            var list = JSON.parse(ajax.responseText);
            list.expand_list.forEach(item => {
                var fieldset = document.createElement("fieldset");
                var legend = document.createElement("legend");
                var btn = document.createElement("button");
                btn.addEventListener("click", function () {

                    console.log("success");

                    var epage = document.getElementById("empty-page").cloneNode(true);
                    epage.style.display = "block";
                    epage.children[0].children[0].innerHTML = item.name;
                    var fileajax = new XMLHttpRequest();
                    fileajax.onreadystatechange = function () {
                        epage.children[1].innerHTML = fileajax.responseText;
                        console.log(fileajax.responseText);
                    }
                    fileajax.open('GET', item.url);
                    fileajax.send();
                    document.body.appendChild(epage);
                });
                legend.innerHTML = item.name;
                btn.innerHTML = `打开文件`;
                btn.classList = "btn";
                fieldset.appendChild(legend);
                fieldset.appendChild(btn);
                document.getElementById("expand").children[1].appendChild(fieldset);
                //

            
                //
                document.querySelectorAll(".page-name").forEach(function (item) {
                    item.addEventListener("click", function () {
                        //点击page-name是关闭该页面
                        item.parentElement.parentElement.style.left = "120%"
                        setTimeout(function () { item.parentElement.parentElement.remove(); }, 350);

                    })
                })
                //


            });
        }
    }
    ajax.open('GET', "server/expand-list.json");
    ajax.send();
}