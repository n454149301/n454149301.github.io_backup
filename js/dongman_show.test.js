var video_data = [];

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

document.getElementsByTagName ("title")[0].innerHTML = "世纪伯乐的小站:" + decodeURI (name);

var articles = document.getElementById ("dongman_list");
articles.innerHTML = "";

var article = document.createElement ("article");
article.setAttribute ("class", "post-block");
articles.appendChild (article);

function get_video (file_num, video_num) {
	xhr=new XMLHttpRequest();
	// console.log ("GET", 'https://raw.githubusercontent.com/n454149301/web_database_dongman' + list_num + '_' + index + '/master/' + video_num + '/' + file_num + '.mkv', true);
	// xhr.open ("GET", 'https://raw.githubusercontent.com/n454149301/web_database_dongman' + list_num + '_' + index + '/master/' + video_num + '/' + file_num + '.mkv', true);
	console.log ("GET", '../../../web_database_dongman' + list_num + '_' + index + '/' + video_num + '/' + file_num + '.mkv', true);
	xhr.open ("GET", '../../../web_database_dongman' + list_num + '_' + index + '/' + video_num + '/' + file_num + '.mkv', true);
	xhr.responseType = 'blob';

	xhr.onload = function (e) {
		if ((this.response.type === "text/xml") || (this.response.type === "text/html")) {
			if (file_num == 1000) {
					return;
			}

			video_data[file_num] = this.response;
			var video = document.getElementsByTagName ("video")[0];
			var blob = new Blob (video_data, {type: 'video/mkv'});

			// video.getElementsByTagName ("track")[0].src = "https://raw.githubusercontent.com/n454149301/web_database_dongman" + list_num + '_' + index + "/master/" + video_num + "/track.srt";

			console.log (video_data);
			document.getElementById ("ready_get_num").innerHTML = "加载完毕"

			console.log (blob);
			// get_track (file_num, video_num);
			video.src = window.URL.createObjectURL (blob);
			video.autoplay = true;
		} else {
			console.log (video_data)
			video_data[file_num] = this.response;
			console.log (video_data)
			console.log (video_data[0])
			document.getElementById ("ready_get_num").innerHTML = file_num;

			if (file_num == 0) {
			var video = document.getElementsByTagName ("video")[0];
			var blob = new Blob (video_data, {type: 'video/mkv'});
			video.src = window.URL.createObjectURL (blob);
			video.autoplay = true;
			}

			console.log (file_num);
			get_video (file_num + 1, video_num);
		}
	}

	xhr.send ()
}

function get_list () {
	xhr=new XMLHttpRequest();
	// console.log ('https://raw.githubusercontent.com/n454149301/web_database_dongman' + list_num + '_' + index + '/master/list.txt')
	xhr.open ("GET", '../dongman/' + list_num + '/' + index + '/list.txt', true);
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				for (let i = 1; i <= parseInt (xhr.responseText); i++) {
					var button = document.createElement ("button");
					button.setAttribute ("onclick", "get_video(0, " + i + ")");
					button.innerHTML = "第" + i + "集";
					article.appendChild (button);
				}
			}
		}
	}

	xhr.send ()
}

function get_num () {
	xhr=new XMLHttpRequest();
	xhr.open ("GET", '../dongman/' + list_num + '/' + index + '/list.txt', true);
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				for (let i = 1; i <= parseInt (xhr.responseText); i++) {
					var button = document.createElement ("button");
					button.setAttribute ("onclick", "get_video(0, " + i + ")");
					button.innerHTML = "第" + i + "集";
					article.appendChild (button);
				}
			}
		}
	}

	xhr.send ()
}

function get_track (file_num, video_num) {
	xhr=new XMLHttpRequest();
	console.log ("GET", 'https://raw.githubusercontent.com/n454149301/web_database_dongman' + list_num + '_' + index + '/master/' + video_num + '/track.srt', true);
	xhr.open ("GET", 'https://raw.githubusercontent.com/n454149301/web_database_dongman' + list_num + '_' + index + '/master/' + video_num + '/track.srt', true);
	xhr.responseType = 'blob';
	xhr.onload = function (e) {
		var track = document.getElementsByTagName ("track")[0];
		var blob = new Blob (this.response, {type: 'text/html'})

		track.src = window.URL.createObjectURL (blob);
	}
}

get_list ();
