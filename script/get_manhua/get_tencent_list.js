document.cookie = ""

var manhua_urls = [];

function get_manhua_list (my_document) {
	var manhua_list = my_document.getElementsByClassName ("mod-cover-list-thumb")

	for (var i = 0; i < manhua_list.length; i++) {
		// console.log (i);
		manhua_urls.push (manhua_list[i].href);
	}

	console.log ("over one page");
}

function get_next (next_num) {
	xhr=new XMLHttpRequest();
	xhr.open ("GET", "http://ac.qq.com/Comic/all/finish/1/search/time/vip/1/page/" + next_num, true);
	xhr.send ()
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// console.log (xhr.responseText);
			var tmp = document.createElement ("div");
			tmp.innerHTML = xhr.responseText;
			console.log ("get new page")
			get_manhua_list (tmp);

			get_next (next_num + 1);
		} else {
			console.log (xhr.statusText);
		}
	}
}

get_manhua_list (document);

get_next (1);
