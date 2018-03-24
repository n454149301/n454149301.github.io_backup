document.cookie = ""

var manhua_curls = "";
var test_duan;

function get_manhua (next_manhua, next_page) {
	console.log (manhua_menus[next_manhua][next_page][1])
	xhr=new XMLHttpRequest();
	xhr.open ("GET", manhua_menus[next_manhua][next_page][1], true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// console.log (xhr.responseText);
			let tmp = document.createElement ("div");
			test_duan = tmp;
			tmp.innerHTML = xhr.responseText;
			document.getElementsByTagName ("body")[0].appendChild (tmp);

			console.log (tmp)
			let imgs = tmp.getElementsByClassName ("comic-contain").getElementsByTagName ("img");

			for (let i = 0, fuck_num = 0; i < imgs.length; i++, fuck_num++) {
				if (imgs[i].class == "adTop") {
					console.log ("get adTop");
					fuck_num--;
					continue;
				}
				if (imgs[i].class == "adBottom") {
					console.log ("get adBottom");
					fuck_num--;
					continue;
				}

				manhua_curls += "mkdir -p " + manhua_menus[next_manhua][next_page][0] + "/" + next_page + "\n"
				manhua_curls += "curl '" + imgs[fuck_num] + "' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7,zh-TW;q=0.6' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Connection: keep-alive' --compressed --output'" + manhua_menus[next_manhua][next_page][0] + "/" + next_page + "/" + manhua_menus[next_manhua][next_page][0] + fuck_num + ".jpg\n";
			}

			console.log ("get new menu")
			if (next_manhua == manhua_menus.length - 1) {
				console.log ("get menu end");
				return;
			}

			if (next_page == manhua_menus[next_manhua].length - 1) {
				get_manhua (next_manhua + 1, 0);
			} else {
				get_manhua (next_manhua, next_page + 1);
			}
		} else {
			console.log (xhr.statusText);
		}
	}
	xhr.send ()
}

get_manhua (0, 0);
