function openRandomApp() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../yytj.json", true);
  xhr.responseType = "json";
  xhr.onload = function() {
    if (xhr.status === 200) {
      var yytjData = xhr.response.yytj;
      console.log(yytjData);
    }
  };
  xhr.send();
}
