$(document).ready(function () {
    $.ajax({
        url: 'https://wannianqingshi.github.io/WatchAppStore/server/lbt.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var slideshowDiv = $('.slideshow');
            slideshowDiv.empty();
            data.forEach(function (img) {
                slideshowDiv.append('<img src="' + img.image + '" alt="' + img.alt + '">');
            });
            var images = slideshowDiv.children('img');
            if (images.length > 0) {
                $(images[0]).css('opacity', 1);
            }

            var currentIndex = 0;
            var interval = setInterval(function () {
                $(images[currentIndex]).css('opacity', 0); 
                currentIndex = (currentIndex + 1) % images.length; 
                $(images[currentIndex]).css('opacity', 1);
            }, 3000); 
        },
        error: function () {
            console.log('error');
        }
    });
});



