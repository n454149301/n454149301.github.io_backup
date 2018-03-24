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

var index_parm = url.substr (1).split ("&")[2];
if (index_parm.split ("=")[0] != "index") {
	console.log ("参数获取失败");
	throw SyntaxError();
}
var index = index_parm.split ("=")[1];

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

// 所有页码所在位置
var paginators = document.getElementsByClassName ("paginator");

for (let i = 0; i < paginators.length; i++) {
	if (i == paginators.length) {
		break;
	}
	let main = document.createElement ("div");
	main.setAttribute ("class", "next-wrap col-md-6 col-xs-6 col-md-offset-6 col-xs-offset-6");

	paginators[i].appendChild (main);

	if (index - 1 > 0) {
		let tmp = document.createElement ("a");
		tmp.setAttribute ("class", "next-page");
		tmp.href = "changpian_wanjie_manhua_show.html?list_num=" + list_num + "&name=" + name + "&index=" + ("000" + (parseInt (index) - 1)).substr (-3);
		tmp.innerHTML = "上一章";
		main.appendChild (tmp);
	}

	let tmp = document.createElement ("a");
	tmp.setAttribute ("class", "next-page");
	tmp.href = "changpian_wanjie_manhua_show.html?list_num=" + list_num + "&name=" + name + "&index=" + ("000" + (parseInt (index) + 1)).substr (-3);
	tmp.innerHTML = "下一章";
	main.appendChild (tmp);
}

function get_manhua (num) {
	let xhr = new XMLHttpRequest ();
	// xhr.open ("GET", "../manhua/" + list_num + "/" + name + "/" + name + num + ".jpg");
	xhr.open ("GET", "https://raw.githubusercontent.com/n454149301/web_database_changpian_wanjie_manhua" + list_num + "/master/manhua/" + name + "/" + ("0000" + index).substr (-4) + "/" + ("000" + (num + 1)).substr (-3) + ".jpg");
	xhr.responseType = 'blob';
	xhr.onload = function (e) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				// console.log (manhua_list)
				var entry_div = document.createElement ("div");
				entry.appendChild (entry_div);

				var entry_img = document.createElement ("img");
				entry_img.setAttribute ("src", window.URL.createObjectURL (this.response));
				// console.log (entry)
				entry_div.appendChild (entry_img);
				// console.log (entry)
				if (num == 22) {
					// return
				}

				get_manhua (num + 1);
			} else {
				if (xhr.status == 404) {
					loading.innerHTML = "没有了...";
					return
				}
				get_manhua (num);
			}
		} else {
			get_manhua (num);
			return
		}
	}

	xhr.send ();
}

get_manhua (0);
