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

// 一页显示最大漫画数量
var page_max_dongman_num = 20;

// 动漫列表总表
var dongman_list = [];

flush_function = show_list;

document.getElementsByTagName ("title")[0].innerHTML = "世纪伯乐的小站:动漫列表";

function show_list () {
	let dongman_num = page_num * page_max_dongman_num;
	let dongman_max_num = page_num * page_max_dongman_num + 20;

	let articles = document.getElementById ("dongman_list");
	articles.innerHTML = "";
	for (let i = dongman_num; i <= dongman_max_num; i++) {
		if (i >= dongman_list.length) {
			break;
		}
		// 添加一条动漫
		let article = document.createElement ("article");
		article.setAttribute ("class", "post-block");
		articles.appendChild (article);

		let title = document.createElement ("h2");
		title.setAttribute ("class", "post-title");
		article.appendChild (title);

		let title_a = document.createElement ("a");
		// console.log (i)
		title_a.innerHTML = dongman_list[i][0];
		title_a.setAttribute ("target", "_blank");
		title_a.setAttribute ("class", "post-link");
		title_a.setAttribute ("href", "../src/dongman_index.html?list_num=" + dongman_list[i][1] + "&name=" + dongman_list[i][0]);
		title.appendChild (title_a);

		let info = document.createElement ("div");
		info.setAttribute ("class", "post-info");
		info.innerHTML = "世纪伯乐的小站，来源请注明出处，侵权请告知：naonao800@163.com";
		article.appendChild (info);

		let entry = document.createElement ("div");
		entry.setAttribute ("class", "post-entry");
		article.appendChild (entry);

		let entry_p = document.createElement ("p");
		entry.appendChild (entry_p);

		let entry_p_a = document.createElement ("a");
		entry_p_a.setAttribute ("target", "_blank");
		entry_p_a.setAttribute ("href", "../src/dongman_index.html?list_num=" + dongman_list[i][1] + "&name=" + dongman_list[i][0]);
		entry_p.appendChild (entry_p_a);

		let entry_p_a_img = document.createElement ("img");
		// entry_p_a_img.setAttribute ("src", "../dongman/" + dongman_list[i][1] + "/" + dongman_list[i][0] + "/" + dongman_list[i][0] + "0.jpg");
		entry_p_a_img.setAttribute ("src", "https://raw.githubusercontent.com/n454149301/web_database_dongman" + dongman_list[i][1] + "_0/master/" + dongman_list[i][0] + ".jpg");
		entry_p_a_img.setAttribute ("height", "400");
		entry_p_a_img.setAttribute ("width", "400");
		entry_p_a.appendChild (entry_p_a_img);
	}
}

random_function = function () {
	page_num = 0;
	dongman_list.sort(function(){return Math.random()>0.5?-1:1;}); 
	show_list ();
	change_page (0);
}

function get_list () {
	let xhr = new XMLHttpRequest ();
	xhr.open ("GET", "../dongman/list.txt");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				let tmp = [];
				// console.log (xhr.responseText)
				tmp = xhr.responseText.split ("\n");
				for (let i = 0; i < tmp.length - 1; i++) {
					let tmp_name = new Array (tmp[i], i);
					dongman_list.push (tmp_name);
				}
				page_max_num = Math.ceil (dongman_list.length / page_max_dongman_num) - 1;
				// console.log (dongman_list);
				// console.log (page_max_num);
				// console.log (dongman_list_num);
				show_list ();
				change_page ();
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

function search_dongman () {
	let search_value = document.getElementById ("search_dongman_input").value;
	let search_dongman_list = [];

	for (let i = 0; i < dongman_list.length; i++) {
		if (dongman_list[i][0].indexOf (search_value) >= 0) {
			search_dongman_list.push (dongman_list[i]);
			// console.log ("name: " + dongman_list[i][0] + " get");
		}
		// console.log ("name: " + dongman_list[i][0] + " not get");
	}
	// console.log (search_dongman_list);
	dongman_list = search_dongman_list;
	page_max_num = Math.ceil (dongman_list.length / page_max_dongman_num) - 1;
	show_list ();
	change_page ();
}

function search_dongman_enter () {
	if (event.keyCode == 13) {
		search_dongman ();
	}
}

