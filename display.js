// TITLE IMAGES BACKGROUND
// FIRST LINE
var title_img_bg = ["RewindTime_Preview_1.png", "SquareSmasher_Preview_1.png", "SquareSmasher_Preview_1.png", "SquareSmasher_Preview_3.png", "SquareSmasher_Preview_3.png"];

$(".lineUp").html('<img class="first" src="game_images/'+ title_img_bg[0] +'">');
for (var i = title_img_bg.length - 1; i >= 0; i--) {
	$(".lineUp").html($(".lineUp").html()+'<img src="game_images/'+ title_img_bg[i] +'">');
}
for (var i = title_img_bg.length - 1; i >= 0; i--) {
	$(".lineUp").html($(".lineUp").html()+'<img src="game_images/'+ title_img_bg[i] +'">');
}
// SECOND LINE
var title_img_bg = ["RewindTime_Preview_5.png", "SquareSmasher_Preview_2.png", "SquareSmasher_Preview_2.png", "SquareSmasher_Preview_4.png", "SquareSmasher_Preview_4.png"];

$(".lineDown").html('<img class="first" src="game_images/'+ title_img_bg[0] +'">');
for (var i = title_img_bg.length - 1; i >= 0; i--) {
	$(".lineDown").html($(".lineDown").html()+'<img src="game_images/'+ title_img_bg[i] +'">');
}
for (var i = title_img_bg.length - 1; i >= 0; i--) {
	$(".lineDown").html($(".lineDown").html()+'<img src="game_images/'+ title_img_bg[i] +'">');
}

// LOAD JSON FILE
    var requestURL = 'data.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
		var data_file = request.response;
		pageContent(data_file);
		return data_file_ = data_file;
    }

// DISPLAY DEVLOGS
function displayDevlogsHead(devInfos, idHead, destination) {
	color_type = ["#c0392b", "#e67e22"];
	name_type = ["Major Update", "Unstable update"];

	$(destination).append('<div class="log logButton" id="'+ idHead +'" align="center" style="background-image: linear-gradient(0,rgba(0,0,0,.6), rgba(0,0,0,.6)), url(\''+ devInfos.devIcon +'\');" onmousedown="openDevlogs('+ devInfos.devId +');"></div>');
		$(destination+' #'+idHead).append('<div class="icon" style="background-image: url(\''+ devInfos.devIcon +'\');"></div>');
		$(destination+' #'+idHead).append('<h4>'+ devInfos.name +'</h4>');
		$(destination+' #'+idHead).append('<h5 class="tag" style="background-color: '+ color_type[devInfos.type] +';">'+ name_type[devInfos.type] +'</h5>');
}

// DISPLAY INFORMATIONS
function pageContent(data) {
	// Display sotres links
	for (var i = data.stores.length - 1; i >= 0; i--) {
		$('.panel .previewApps .store').append('<p onmousedown="change_store(\''+ data.stores[i].name.replace(/ /g, "") +'\'); $(this).css(\'text-decoration\', \'underline\');">'+ data.stores[i].name +'</p>');
	}

	// Display the applications
	$('.panel .previewApps .apps').html('');
	for (var i = data.applications.length - 1; i >= 0; i--) {
		infos = data.applications[i];
		name = infos.name;
		id = name.replace(/ /g, "");
		$('.panel .previewApps .apps').append('<div class="app_body" id="'+ id +'" onmousedown="see_game(\''+ id +'\');"></div>');
			$('.panel .previewApps .apps #'+ id).append('<img src="'+ infos.appIcon +'" alt="'+ infos.appIcon +'">');
			$('.panel .previewApps .apps #'+ id).append('<h1>'+ name +'</h1>');
			$('.panel .previewApps .apps #'+ id).append('<a class="dis">Discover</a>');
			$('.panel .previewApps .apps #'+ id).append('<div class="game_content"></div>');
				// GAME CONTENT
				$('.panel .previewApps .apps #'+ id+' .game_content').append('<p class="shortResume">'+ infos.shortResume +'</p>');
				$('.panel .previewApps .apps #'+ id+' .game_content').append('<div class="download" align="center"></div>');
					for (var s = 0; s < infos.idStores.length; s++) {
						$('.panel .previewApps .apps #'+ id+' .game_content .download').append('<a style="background-image: url(\''+ data.stores[infos.idStores[s]].logo +'\');" target="blank" href="'+ infos.linkStores[s] +'"></a>');
						$('.panel .previewApps .apps #'+ id).attr('class', $('.panel .previewApps .apps #'+ id).attr('class') +' '+ data.stores[infos.idStores[s]].name.replace(/ /g, ""));
					}
					$('.panel .previewApps .apps #'+ id+' .game_content').append('<div class="preview_illustration"></div>');
						// PREVIEW
						  // VIDEOS
						  if (infos.videos != 0) {
							for (var a = 0; a < infos.videos.length; a++) {
								$('.panel .previewApps .apps #'+ id+' .game_content .preview_illustration').append('<iframe width="1280\" height=\"720\" src=\"'+ infos.videos[a] +'\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>');
							}
						  }
						  //IMG
						for (var a = 1; a < infos.imagesNb; a++) {
							$('.panel .previewApps .apps #'+ id+' .game_content .preview_illustration').append('<img src="game_images/'+ id +'_Preview_'+ a +'.jpg">');
						}
						$('.panel .previewApps .apps #'+ id+' .game_content').append('<p class="resume">'+ infos.resume +'</p>');
					// DEVLOGS
					$('.panel .previewApps .apps #'+ id+' .game_content').append('<div class="devlogs"></div>');
						$('.panel .previewApps .apps #'+ id+' .game_content .devlogs').append('<h2>Devlogs</h2>');
							for (var d = data.devlogs.length - 1; d >= 0; d--) {
								if (data.devlogs[d].appId == infos.appId) {
									displayDevlogsHead(data.devlogs[d], "preview"+i+d, '.panel .previewApps .apps #'+ id+' .game_content .devlogs');
								}
							}
	}

	// Display last updates
	for (var d = data.devlogs.length - 1; d >= 0; d--) {
		displayDevlogsHead(data.devlogs[d], "last_update_"+d, '.devlogs_list');
	}

	// DEVLGOS PAGES
	color_type = ["#c0392b", "#e67e22"];
	name_type = ["Major Update", "Unstable update"];
	for (var i = 0; i < data.devlogs.length; i++) {
		devInfos = data.devlogs[i];
		id = devInfos.devId;
		$('.panels').append('<div class="log" id="log-'+ id +'" style="background-image: linear-gradient(0,rgba(255,255,255,.95), rgba(255,255,255,.95)), url(\''+ devInfos.devIcon +'\');">');
			$('.panels #log-'+id).append('<img src="'+ devInfos.devIcon +'">');
			$('.panels #log-'+id).append('<h4>'+ devInfos.name +'</h4>');
			$('.panels #log-'+id).append('<p class="name_game">Game: '+ data.applications[devInfos.appId].name +'</p>');
			$('.panels #log-'+id).append('<h5 class="tag" style="background-color: '+ color_type[devInfos.type] +';">'+ name_type[devInfos.type] +'</h5>');
			$('.panels #log-'+id).append('<p class="date">'+ devInfos.date +'</p>');
			$('.panels #log-'+id).append('<p class="logButton" onmousedown="openDevlogs('+ id +');"><i class=\'fas fa-times\'></i></p>');
			$('.panels #log-'+id).append('<div class="preview_illustration"></div>');
				// PREVIEW
				  // VIDEOS
				  if (devInfos.videos != 0) {
					for (var a = 0; a < devInfos.videos.length; a++) {
						$('.panels #log-'+id +' .preview_illustration').append('<img src="devlogs_images/'+ id +'_'+ a +'.jpg">').append('<iframe width="1280" height="720" src="'+ devInfos.videos[a] +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
					}
				  }
				  //IMG
				for (var a = 1; a < devInfos.imagesNb; a++) {
					$('.panels #log-'+id +' .preview_illustration').append('<img src="devlogs_images/'+ id +'_'+ a +'.jpg">');
				}
			$('.panels #log-'+id).append('<p class="resume">'+ devInfos.resume +'</p>');
	}
}