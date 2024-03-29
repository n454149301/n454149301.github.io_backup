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

// 动漫列表总表
var dongman_list = [];

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

var articles = document.getElementById ("dongman_list");
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

function get_list () {
	let xhr = new XMLHttpRequest ();
	xhr.open ("GET", "../dongman/" + list_num + "/list.txt");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				let tmp = [];
				// console.log (xhr.responseText)
				tmp = xhr.responseText.split ("\n");
				for (let i = 0; i < tmp.length - 1; i++) {
					var entry_div = document.createElement ("div");
					entry.appendChild (entry_div);

					var entry_a = document.createElement ("a");
					entry_a.setAttribute ("href", "dongman_show.html?list_num=" + list_num + "&name=" + name + "&index=" + i)
					entry_a.setAttribute ("target", "blank");
					entry_a.innerHTML = tmp[i]
					entry_div.appendChild (entry_a);
					loading.innerHTML = "没有了...";
				}
			} else {
				if (xhr.status == 404) {
					return
				}
			}
		} else {
			return
		}
	}
	xhr.send ();
}

get_list ();
