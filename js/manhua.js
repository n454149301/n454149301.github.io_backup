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

// 漫画列表数量
var manhua_list_num = 0;

// 漫画列表总表
var manhua_list = [];

flush_function = show_list;

function show_list () {
	let manhua_num = page_num * page_max_manhua_num;
	let manhua_max_num = page_num * page_max_manhua_num + 20;

	let articles = document.getElementById ("manhua_list");
	articles.innerHTML = "";
	for (let i = manhua_num; i <= manhua_max_num; i++) {
		if (i >= manhua_list.length) {
			break;
		}
		// 添加一条漫画
		let article = document.createElement ("article");
		article.setAttribute ("class", "post-block");
		articles.appendChild (article);

		let title = document.createElement ("h2");
		title.setAttribute ("class", "post-title");
		article.appendChild (title);

		let title_a = document.createElement ("a");
		// console.log (i)
		title_a.innerHTML = manhua_list[i][0];
		title_a.setAttribute ("target", "_blank");
		title_a.setAttribute ("class", "post-link");
		title_a.setAttribute ("href", "../src/manhua_show.html?list_num=" + manhua_list[i][1] + "&name=" + manhua_list[i][0]);
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
		entry_p_a.setAttribute ("href", "../src/manhua_show.html?list_num=" + manhua_list[i][1] + "&name=" + manhua_list[i][0]);
		entry_p.appendChild (entry_p_a);

		let entry_p_a_img = document.createElement ("img");
		// entry_p_a_img.setAttribute ("src", "../manhua/" + manhua_list[i][1] + "/" + manhua_list[i][0] + "/" + manhua_list[i][0] + "0.jpg");
		entry_p_a_img.setAttribute ("src", "https://raw.githubusercontent.com/n454149301/web_database_duanpian_lingsui_manhua" + manhua_list[i][1] + "/master/manhua/" + manhua_list[i][0] + "/" + manhua_list[i][0] + "0.jpg");
		entry_p_a_img.setAttribute ("height", "400");
		entry_p_a_img.setAttribute ("width", "400");
		entry_p_a.appendChild (entry_p_a_img);
	}
}

random_function = function () {
	page_num = 0;
	manhua_list.sort(function(){return Math.random()>0.5?-1:1;}); 
	show_list ();
	change_page (0);
}

function get_list (num) {
	if (num == -1) {
		show_list ();
		change_page (0);
		return
	}

	let xhr = new XMLHttpRequest ();
	xhr.open ("GET", "../web_database_duanpian_lingsui_manhua/" + num + "/list.txt");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				let tmp = [];
				// console.log (xhr.responseText)
				tmp = xhr.responseText.split ("\n");
				for (let i = 0; i < tmp.length - 1; i++) {
					let tmp_name = new Array (tmp[i], num);
					manhua_list.push (tmp_name);
				}
				page_max_num = Math.ceil (manhua_list.length / page_max_manhua_num) - 1;
				// console.log (manhua_list);
				// console.log (page_max_num);
				if (num == manhua_list_num) {
					// console.log (manhua_list_num);
					show_list ();
					change_page ();
				}

				get_list (num-1);
			} else {
				if (xhr.status == 404) {
					return
				}
				get_list (num);
			}
		} else {
			return
		}
	}
	xhr.send ();
}

get_list (manhua_list_num);

function search_manhua () {
	let search_value = document.getElementById ("search_manhua_input").value;
	let search_manhua_list = [];

	for (let i = 0; i < manhua_list.length; i++) {
		if (manhua_list[i][0].indexOf (search_value) >= 0) {
			search_manhua_list.push (manhua_list[i]);
			// console.log ("name: " + manhua_list[i][0] + " get");
		}
		// console.log ("name: " + manhua_list[i][0] + " not get");
	}
	// console.log (search_manhua_list);
	manhua_list = search_manhua_list;
	page_max_num = Math.ceil (manhua_list.length / page_max_manhua_num) - 1;
	show_list ();
	change_page ();
}

function search_manhua_enter () {
	if (event.keyCode == 13) {
		search_manhua ();
	}
}

