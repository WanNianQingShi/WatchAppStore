function downloadFrom(url) {
	//console.log(url)
	var download = plus.downloader.createDownload(url, {}, function (d, status) {
		if (status == 200) {
			//console.log(d.filename);
			plus.nativeUI.toast("下载已完成");
			plus.runtime.install(d.filename);

		} else {
			d.abort();
			plus.nativeUI.alert("下载失败，检查网络连接或稍后重试。", {}, "下载", "确定");
			setDownloadProgressData(100);
		}

	})

	download.addEventListener("statechanged", function (task, status) {
		var persent = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100);
		console.log(persent);
		document.querySelectorAll('.app-info-dl-progress')[document.getElementsByClassName('app-info-dl-progress').length-1].innerHTML=`已下载:${persent}%`;
		if(persent==100){
			document.querySelectorAll('.app-info-dl-progress')[document.getElementsByClassName('app-info-dl-progress').length-1].innerHTML=`已完成下载`;
		}
		//plus.nativeUI.toast(" 下载进度:"+persent+"% ");
		//setDownloadProgressData(persent);
	}, false);
	download.start();
}

function removeDownloadFile() {
	plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, function (fs) {
		fs.root.removeRecursively();
		plus.nativeUI.toast("已执行");
	})
}

function quitApp() {
	plus.runtime.quit();
}