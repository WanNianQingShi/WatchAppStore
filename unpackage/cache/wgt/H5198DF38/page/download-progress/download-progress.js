function setDownloadProgressData(percent) {
    var targetPostion = document.getElementsByClassName("download-progress-perview").length - 1;
    if (percent < 100) {
        document.getElementsByClassName("download-progress-percent")[targetPostion].innerHTML = `${percent}%`;
        document.getElementsByClassName("download-progress-perview")[targetPostion].style.height = `${percent}%`;
    }
    else {
        //document.getElementsByClassName("download-progress")[targetPostion].remove();
        document.getElementsByClassName("download-progress")[targetPostion].style.left = "100%"
        setTimeout(function () { document.getElementsByClassName("download-progress")[targetPostion].remove(); }, 350);
    }
}