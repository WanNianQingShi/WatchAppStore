function loadAppList(){
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4 && ajax.status==200){
            var list=JSON.parse(ajax.responseText);
            list=list.applist;
            list.forEach(item => {
                var str=JSON.stringify(item);
                var btn=document.createElement('button');
                btn.classList="btn";
                btn.setAttribute('value',str);
                btn.innerHTML=`${item.name}<span>${item.version}</span>`;
                btn.setAttribute("onclick","openAppInfoPage(event)")
                document.getElementById("all-app").children[1].appendChild(btn);
                
            });
            
        }
    }
    ajax.open("GET","server/app-list.json",true);
    ajax.send();
}

//用5plus下载文件



function openAppInfoPage(e){
    var btn=e.target;
    var info=JSON.parse(btn.value);
    //console.log(info);
    document.getElementById("app-info-name").innerHTML=info.name;
    document.getElementById("app-info-version").innerHTML=info.version;
    document.getElementById("app-info-description").innerHTML=info.description;
    document.getElementById("app-info-author").innerHTML=info.author;
    document.getElementById("app-info-download-btn").setAttribute("onclick","startDownload('"+info.url+"')");
    clonePage("app-info");

}

function startDownload(value){
    //Debug   正常使用须传入uniapp下载进度参数
    clonePage("download-progress");
    var gress=0
    var lis=setInterval(function(){
        gress=gress+14;
        setDownloadProgressData(gress);
        if(gress>=100){
            clearInterval(lis)
        }
    },600)
    //
    // window.open(value);
    // window.history.back();
}