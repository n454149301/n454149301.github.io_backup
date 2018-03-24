var manhua_urls = [];

function get_manhua_list (my_document) {
	var manhua_list = my_document.getElementsByClassName ("posts-default-title");

	for (var i = 0; i < manhua_list.length; i++) {
		// console.log (i);
		manhua_urls.push (manhua_list[i].getElementsByTagName ("a")[0].getAttribute ("href"));
	}

	console.log ("over one page");
}

function get_next (next_url) {
	xhr=new XMLHttpRequest();
	xhr.open ("GET", next_url, true);
	xhr.send ()
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// console.log (xhr.responseText);
			var tmp = document.createElement ("div");
			tmp.innerHTML = xhr.responseText;
			console.log ("get new page")
			get_manhua_list (tmp);

			if (tmp.getElementsByClassName ("next").length == 0) {
				console.log ("get end page");
				return
			} else {
				get_next (tmp.getElementsByClassName ("next")[0].getAttribute ("href"));
			}
		} else {
			console.log (xhr.statusText);
		}
	}
}

get_manhua_list (document);

var next_url = document.getElementsByClassName ("next")[0].getAttribute ("href");
next_url = get_next (next_url);
