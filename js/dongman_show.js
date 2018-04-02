var video_data = [];
var now_video_num = 0;

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

var video = document.getElementsByTagName ("video")[0];
var tracks = [];
var video_current_time = 0;

video.ontimeupdate = function () {
	if (video.currentTime == video.duration) {
	} else {
		video_current_time = video.currentTime;
	}
}

var wait_flag = 0;
video.onended = function () {
	if (wait_flag != 0) {
		return;
	}

	var blob = new Blob (video_data, {type: 'video/mkv'});

	video.src = window.URL.createObjectURL (blob);
	// console.log (video_current_time)
	// console.log (video.currentTime)
	video.currentTime = video_current_time;

	wait_flag = 1;
	video.play ();
	setTimeout(function () {
		video.currentTime = video_current_time;
		wait_flag = 0;
		video.play ();
	}, 5000);
}

function get_video (file_num, video_num) {
	if ((file_num == 0) && (now_video_num == video_num)) {
		return;
	}

	if (file_num == 0) {
		now_video_num = video_num;
		video_data = [];
		video_current_time = 0;
	}

	if (now_video_num != video_num) {
		return;
	}

	xhr=new XMLHttpRequest();
	var fileReader = new FileReader ();
	// console.log ("GET", 'https://raw.githubusercontent.com/n454149301/web_database_dongman' + list_num + '_' + index + '/master/' + video_num + '/' + file_num + '.mkv', true);
	xhr.open ("GET", 'https://raw.githubusercontent.com/n454149301/web_database_dongman' + list_num + '_' + index + '/master/' + video_num + '/' + file_num + '.mkv', true);
	xhr.responseType = 'blob';

	xhr.onload = function (e) {
			if ((this.response.type === "text/xml") || (this.response.type === "text/html")) {
			// console.log (video.currentTime);
			video.src = window.URL.createObjectURL (blob);
			video.autoplay = true;
			}

			// console.log (video_data)
			video_data[file_num] = this.response;
			// console.log (video_data[0])
			document.getElementById ("ready_get_num").innerHTML = file_num;

			if (file_num <= 10) {
				var blob = new Blob (video_data, {type: 'video/mkv'});
				video.src = window.URL.createObjectURL (blob);
				for (let i = 0; i < tracks.length; i++) {
					tracks[i].track.mode = "disabled";
				}
				tracks[video_num - 1].track.mode = "showing";
				video.currentTime = video_current_time;
				video.play ();
			}
			get_video (file_num + 1, video_num);

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
					get_track (i);
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

function get_track (video_num) {
	var track = document.createElement ("track");
	track.src = '../dongman/' + list_num + '/' + index + '/' + video_num + '/track.vtt';
	track.srclang = "zh";
	track.kind = "subtitles";
	track.label = "第" + video_num + "集";
	video.appendChild (track);
	tracks.push (track);
}

get_list ();
