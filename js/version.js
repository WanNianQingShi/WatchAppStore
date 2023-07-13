//用5plus下载文件
function downloadFile(url, fileName) {
    plus.downloader.createDownload(url, {filename: fileName}, function (d, status) {
        if (status == 200) {
            //打开下载的文件
            //plus.runtime.openFile(d.filename);
            //安装apk
            plus.runtime.install(d.filename);
            //返回文件的储存路径
            //return d.filename;
            //返回下载进度
            //return d.downloadedSize;
            //返回已下载的数据量
            //return d.downloadedData;
            //返回下载文件存储空间
            //return d.totalSize;
            
            console.log("download success");
        } else {
            console.log("download failed");
        }
    }).start();
}