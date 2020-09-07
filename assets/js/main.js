var btn = $("#btntotop");
$(window).scroll(function () {
  console.log($(window).scrollTop());
  if ($(window).scrollTop() > 300) {
    console.log(btn);
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});
btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});
function setMetaUrl() {
  document
    .querySelector("meta[property='og:url']")
    .setAttribute("content", `${window.location.href}`);
}
$(document).ready(function () {
  setMetaUrl();
  getCountry();
  let device = getUA();
  let url = getDomain(document.referrer);
  console.log(device);
  console.log(url);
  if (
    device === "Android" ||
    device === "iPhone" ||
    device === "iPad" ||
    url.toLowerCase() === "facebook" ||
    url.toLowerCase() === "intagram" ||
    url.toLowerCase() === "twitter"
  ) {
    loadPage("page2");
  } else {
    loadPage("page1");
  }
});
// untuk mengecek divice
const getUA = () => {
  let device = "Unknown";
  const ua = {
    "Generic Linux": /Linux/i,
    Android: /Android/i,
    BlackBerry: /BlackBerry/i,
    Bluebird: /EF500/i,
    "Chrome OS": /CrOS/i,
    Datalogic: /DL-AXIS/i,
    Honeywell: /CT50/i,
    iPad: /iPad/i,
    iPhone: /iPhone/i,
    iPod: /iPod/i,
    macOS: /Macintosh/i,
    Windows: /IEMobile|Windows/i,
    Zebra: /TC70|TC55/i,
  };
  Object.keys(ua).map((v) => navigator.userAgent.match(ua[v]) && (device = v));
  return device;
};
// untuk mendapatkan negara
function getCountry() {
  $.getJSON("https://ipapi.co/json/", function (data) {
    console.log(data.country_name);
  });
}
// untuk ngejek sumber pengunjung(belum selesai)
// semuanya belum di proses, tunggu page 2 selesai baru bisa sesuai keteria yang di tentukan

function getDomain(url) {
  if (url) {
    var match = /(?:https?:\/\/)?(?:\w+:\/)?[^:?#\/\s]*?([^.\s]+\.(?:[a-z]{2,}|co\.uk|org\.uk|ac\.uk|org\.au|com\.au))(?:[:?#\/]|$)/gi.exec(
      url
    );
    let name = match[1].split(".");
    return name ? name[0] : null;
  } else return null;
}
function loadPage(page) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      $("#totop").append(xhttp.responseText);
    }
  };
  xhttp.open("GET", `${page}.html`, true);
  xhttp.send();
}
