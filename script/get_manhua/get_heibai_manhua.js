var manhua_names = "";
var manhua_curls = "";
var manhua_curls_flag = 0;
var manhua_curls_num = 0;
var manhua_curls_end = 9;
var t1;

function get_manhua () {
	// console.log ("in get_manhua");
	// console.log (manhua_urls[manhua_curls_num]);
	if (manhua_curls_end <= manhua_curls_num) {
		console.log (manhua_urls.length);
		console.log (manhua_curls_num);
		console.log ("get manhua end");
		window.clearInterval (t1);
		return;
	}

	if ((manhua_urls.length - 1) <= manhua_curls_num) {
		console.log (manhua_urls.length);
		console.log (manhua_curls_num);
		console.log ("get manhua end");
		window.clearInterval (t1);
		return;
	} else {
		if (manhua_curls_flag == 1) {
			return
		} else {
			manhua_curls_flag = 1;
		}
	}

	xhr=new XMLHttpRequest();
	xhr.open ("GET", manhua_urls[manhua_curls_num], true);
	xhr.send ()
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// console.log (xhr.responseText);
			var tmp = document.createElement ("div");
			tmp.innerHTML = xhr.responseText;
			image_urls = tmp.getElementsByClassName ("post-image")

			for (var i = 0; i < image_urls.length; i++) {
				image_url = image_urls[i].getElementsByTagName ("img")[0].getAttribute ("src");
				image_name = image_urls[i].getElementsByTagName ("img")[0].getAttribute ("title");
				manhua_curls += "curl '" + image_url + "' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36' --compressed --output '" + image_name + i + ".jpg'\n";
			}
			manhua_names += image_name + "\n";

			manhua_curls_num += 1;
			manhua_curls_flag = 0;
		} else {
			console.log (xhr.statusText);
			manhua_curls_flag = 0;
		}
	}
}

t1 = window.setInterval (get_manhua, 10);
