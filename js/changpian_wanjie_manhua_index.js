var new_scroll_position = 0;
var last_scroll_position;
window.addEventListener ("scroll", function (e) {
	last_scroll_position = window.scrollY;
	if (new_scroll_position < last_scroll_position) {
		document.getElementsByTagName ("nav")[0].setAttribute ("hidden", "hidden");
	} else if (new_scroll_position > last_scroll_position) {
		document.getElementsByTagName ("nav")[0].removeAttribute ("hidden");
	}

	new_scroll_position = last_scroll_position;
});

var url = window.location.search
if (url.indexOf("?") == -1) {
	console.log ("参数获取失败");
	throw SyntaxError();
}
var list_num_parm = url.substr (1).split ("&")[0];
if (list_num_parm.split ("=")[0] != "list_num") {
	console.log ("参数获取失败");
	throw SyntaxError();
}
var list_num = list_num_parm.split ("=")[1];

var name_parm = url.substr (1).split ("&")[1];
if (name_parm.split ("=")[0] != "name") {
	console.log ("参数获取失败");
	throw SyntaxError();
}
var name = name_parm.split ("=")[1];

document.getElementsByTagName ("title")[0].innerHTML = "世纪伯乐的小站:" + decodeURI (name);

var articles = document.getElementById ("manhua_list");
articles.innerHTML = "";

var article = document.createElement ("article");
article.setAttribute ("class", "post-block");
articles.appendChild (article);

var title = document.createElement ("h2");
title.setAttribute ("class", "post-title");
title.innerHTML = decodeURI(name);
article.appendChild (title);

var info = document.createElement ("div");
info.setAttribute ("class", "post-info");
info.innerHTML = "世纪伯乐的小站，来源请注明出处，侵权请告知：naonao800@163.com";
article.appendChild (info);

var entry = document.createElement ("div");
entry.setAttribute ("class", "post-entry");
article.appendChild (entry);

var loading = document.createElement ("h2");
loading.setAttribute ("class", "post-title");
loading.innerHTML = "加载中...";
article.appendChild (loading);

function get_manhua (num) {
	let xhr = new XMLHttpRequest ();
	// xhr.open ("GET", "../manhua/" + list_num + "/" + name + "/" + name + num + ".jpg");
	xhr.open ("GET", "https://raw.githubusercontent.com/n454149301/web_database_changpian_wanjie_manhua" + list_num + "/master/manhua/" + name + "/" + ("0000" + (num + 1)).substr (-4) + "/001.jpg");
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 3) {
			if (xhr.status == 200) {
				xhr.abort ();
				var entry_div = document.createElement ("div");
				entry.appendChild (entry_div);

				var entry_a = document.createElement ("a");
				entry_a.setAttribute ("href", "changpian_wanjie_manhua_show.html?list_num=" + list_num + "&name=" + name + "&index=" + ("000" + (num + 1)).substr (-3));
				entry_a.setAttribute ("target", "blank");
				entry_a.innerHTML = ("000" + (num + 1)).substr (-3);
				entry_div.appendChild (entry_a);

				get_manhua (num + 1);
			} else {
				if (xhr.status == 404) {
					loading.innerHTML = "没有了...";

					return
				}
				get_manhua (num);
			}
		}
	}

	xhr.send ();
}

get_manhua (0);
