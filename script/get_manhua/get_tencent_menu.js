document.cookie = ""

var manhua_menus = [];
var manhua_menus_begin = 0;
var manhua_menus_end = 1000;

function get_manhua_menu (next_num) {
	if (next_num >= manhua_menus_end) {
		console.log ("get to menu_end_num ok");
		return
	}
	console.log ("get to " + next_num);

	xhr=new XMLHttpRequest();
	xhr.open ("GET", manhua_urls[next_num], true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// console.log (xhr.responseText);
			let tmp = document.createElement ("div");
			tmp.innerHTML = xhr.responseText;
			let menu_name = tmp.getElementsByTagName("h2")[0].getElementsByTagName ("strong")[0].innerHTML;
			let menu_href = tmp.getElementsByClassName ("chapter-page-all")[0].getElementsByTagName ("a");
			let block_menu = [];
			for (let i = 0; i < menu_href.length; i++) {
				let block = new Array (menu_name, menu_href[i].href)
				block_menu.push (block)
			}
			manhua_menus.push (block_menu);

			console.log ("get new menu")
			get_manhua_menu (next_num + 1);
		} else {
			console.log (xhr.statusText);
		}
	}
	xhr.send ()
}

get_manhua_menu (manhua_menus_begin);
