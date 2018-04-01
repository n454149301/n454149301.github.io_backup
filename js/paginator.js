// 当前总页数
var page_max_num = 0;
// 当前页数
var page_num = 0;
// 正在显示的页数
var show_page = [];
// 所有页码所在位置
var paginators = document.getElementsByClassName ("paginator");

var flush_function = function () {};
var random_function = function () {};

function add_paginator_node (id_name, class_name, father, innerHTML_text) {
	let tmp = document.createElement ("a");
	tmp.setAttribute ("class", class_name + " " + id_name);
	tmp.setAttribute ("onclick", 'change_page("' + id_name + '")');
	tmp.innerHTML = innerHTML_text;
	if (id_name == "page0") {
		tmp.style.textDecoration = "line-through";
	}
	father.appendChild (tmp);
}

function goto_page_enter () {
	if (event.keyCode == 13) {
		change_page (document.getElementsByClassName ("goto_input"));
	}
}

function build_paginator () {
	for (let i = 0; i < paginators.length; i++) {
		if (i == paginators.length) {
			return
		}

		let main = document.createElement ("div");
		main.setAttribute ("class", "next-wrap col-md-6 col-xs-6 col-md-offset-6 col-xs-offset-6");

		paginators[i].appendChild (main);

		let random_button = document.createElement ("button");
		random_button.setAttribute ("onclick", "random_function()");
		random_button.innerHTML = "随机列表";
		main.appendChild (random_button);

		let prev_sign = document.createElement ("i");
		prev_sign.setAttribute ("class", "fa fa-angle-double-left");
		main.appendChild (prev_sign);

		add_paginator_node ("top_prev", "prev-page", main, "首页");
		add_paginator_node ("prev", "prev-page", main, "上一页");

		for (let num = -5; num <= 5; num++) {
			add_paginator_node ("page" + num, "num-page", main, "");
		}

		add_paginator_node ("next", "next-page", main, "下一页");
		add_paginator_node ("top_next", "next-page", main, "尾页");

		let next_sign = document.createElement ("i");
		next_sign.setAttribute ("class", "fa fa-angle-double-right");
		main.appendChild (next_sign);

		let input_text = document.createElement ("input");
		input_text.setAttribute ("type", "text");
		input_text.setAttribute ("class", "goto_input");
		input_text.setAttribute ("maxlength", "5");
		input_text.setAttribute ("size", "5");
		input_text.setAttribute ("onkeydown", "goto_page_enter ()");
		main.appendChild (input_text);

		let goto_sign = document.createElement ("a");
		goto_sign.setAttribute ("class", "next-page");
		goto_sign.innerHTML = "\n跳转";
		goto_sign.setAttribute ("onclick", "change_page (document.getElementsByClassName (\"goto_input\"))");
		main.appendChild (goto_sign);
	}
}


function change_page (num) {
	if (num == "top_prev") {
		page_num = 0;
	} else if (num == "prev") {
		if (page_num <= 0) {
			page_num = 0;
		} else {
			page_num -= 1;
		}
	} else if (num == "next") {
		if (page_num >= page_max_num) {
			page_num = page_max_num;
		} else {
			page_num += 1;
		}
	} else if (num == "top_next") {
		page_num = page_max_num;
	} else if (num == "page5") {
		let tmp = page_num + 5;
		if (tmp <= 0) {
			page_num = 0;
		} else {
			page_num = tmp;
		}
	} else if (num == "page4") {
		let tmp = page_num + 4;
		if (tmp <= 0) {
			page_num = 0;
		} else {
			page_num = tmp;
		}
	} else if (num == "page3") {
		let tmp = page_num + 3;
		if (tmp <= 0) {
			page_num = 0;
		} else {
			page_num = tmp;
		}
	} else if (num == "page2") {
		let tmp = page_num + 2;
		if (tmp <= 0) {
			page_num = 0;
		} else {
			page_num = tmp;
		}
	} else if (num == "page1") {
		let tmp = page_num + 1;
		if (tmp <= 0) {
			page_num = 0;
		} else {
			page_num = tmp;
		}
	} else if (num == "page-1") {
		let tmp = page_num - 1;
		if (tmp > page_max_num) {
			page_num = page_max_num;
		} else {
			page_num = tmp;
		}
	} else if (num == "page-2") {
		let tmp = page_num - 2;
		if (tmp > page_max_num) {
			page_num = page_max_num;
		} else {
			page_num = tmp;
		}
	} else if (num == "page-3") {
		let tmp = page_num - 3;
		if (tmp > page_max_num) {
			page_num = page_max_num;
		} else {
			page_num = tmp;
		}
	} else if (num == "page-4") {
		let tmp = page_num - 4;
		if (tmp > page_max_num) {
			page_num = page_max_num;
		} else {
			page_num = tmp;
		}
	} else if (num == "page-5") {
		let tmp = page_num - 5;
		if (tmp > page_max_num) {
			page_num = page_max_num;
		} else {
			page_num = tmp;
		}
	} else {
		if (num) {
			for (let i = 0; i < num.length; i++) {
				num = parseInt (num[i].value);
				if (num % 1 === 0) {
					// console.log (num)
					page_num = num;
					break;
				} else {
					continue;
				}
			}
		}
	}
	document.documentElement.scrollTop=0

	flush_function ();
	// 重绘页面标号
	for (let i in paginators) {
		document.getElementsByClassName ("page0")[i].innerHTML = page_num;
		for (let num = -5; num < 0; num++) {
			let page_num_tmp = document.getElementsByClassName ("page" + num)[i];
			if (page_num_tmp.className == null) {
				return
			}
			if (page_num + num < 0) {
				page_num_tmp.innerHTML = "";
				page_num_tmp.setAttribute ("class", "zero-page " + page_num_tmp.className.split (" ")[1]);
			} else {
				page_num_tmp.innerHTML = page_num + num;
				page_num_tmp.setAttribute ("class", "num-page " + page_num_tmp.className.split (" ")[1]);
			}
		}
		for (let num = 1; num < 6; num++) {
			let page_num_tmp = document.getElementsByClassName ("page" + num)[i];
			if (page_num + num > page_max_num) {
				page_num_tmp.innerHTML = "";
				page_num_tmp.setAttribute ("class", "zero-page " + page_num_tmp.getAttribute ("class").split (" ")[1]);
			} else {
				page_num_tmp.innerHTML = page_num + num;
				page_num_tmp.setAttribute ("class", "num-page " + page_num_tmp.getAttribute ("class").split (" ")[1]);
			}
		}
	}
}

build_paginator ();
change_page ();

