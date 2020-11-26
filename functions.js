// MENU
$(window).on('scroll', function function_name() {
	// Change the style of the menu
	// 
	// 

	if (scrollY > 100) {
		$('.menu').attr('class', 'menu menuSmall');
	}else{
		$('.menu').attr('class', 'menu');
	}
});

// HOME -- CHANGE STORE
function change_store(store_name) {
	// Show the good store
	// store_name need to be the exact same name as the class of the store
	// 

	if (store_name != "all") {

		$('.previewApps .apps .app_body').css('display', 'none');
		$('.previewApps .apps .'+store_name).css('display', 'inline-block');
	}else{
		$('.previewApps .apps .app_body').css('display', 'inline-block');
	}
	$('.previewApps .store p').css('text-decoration', 'none');
}

// GAMES
function open_panel(id_panel) {
	// Open the panel
	// id_panel is the div.id on the div.panel you want to open
	// 

	document.location.href = "#"+id_panel;
	if ($('#'+id_panel).attr('class') == "panel") {
		$('#'+id_panel).attr('class', 'panel panelO');
		$('#'+ id_panel +' .seeAll').html('Close');
	}else{
		$('#'+id_panel).attr('class', 'panel');
		$('#'+ id_panel +' .seeAll').html('See all');
	}
	document.location.href = "#"+id_panel;
}

function see_game(name) {
	// Show the game page
	// div.id of the div.[store]
	// 

	var name_classe =  $('#'+name).attr('class');

	document.location.href = "#"+name;

	if (name_classe.includes("gameO") == true) {
		$('#'+name).attr('class', name_classe.replace("gameO", ""));
		$('#'+name).attr('align', 'center');
		$('body').css('overflow-y', 'auto');
		$('#'+name).attr('onmousedown', 'see_game("'+ name +'");');
		$('.close_game').attr('onmousedown', '');
		$('.close_game').attr('style', 'display: none;');
	}else{
		$('#'+name).attr('onmousedown', '');
		$('.close_game').attr('onmousedown', 'see_game("'+ name +'");');
		$('body').css('overflow-y', 'hidden');
		$('.close_game').attr('style', 'display: block;');
		$('#'+name).attr('class', name_classe+" gameO");
		$('#'+name).attr('align', 'left');
	}
}

/* OPEN | CLOSE devlog */
function openDevlogs(id) {
	if ($("#log-"+id).attr("class") == "log") {
		$("#log-"+id).attr("class", "log logO");
		$('body').css('overflow-y', 'hidden');
	}else{
		$("#log-"+id).attr("class", "log");
		$('body').css('overflow-y', 'auto');
	}
}

// DEVLOGS LIST SEE MORE
function logSeeMore(nbShow, devlogMax, action) {
	// Open a little more the list of devlogs
	// nbShow is the current number of devlog visible (min: 3 and max: devlogMax), devlogMax is the number of devlog that exist and action to say if we want make the panel bigger(=1) or smaller(=0)
	//

	if (action == 1) {
		var new_nbShow = nbShow + 3, i = 0;
		
		while (i < devlogMax && i < new_nbShow) {
			i++;
			$(".devlogs_list_"+i).css("display", "block");
			$("#seeLess").css("display", "inline-block");
			$("#seeLess").attr("onmousedown", "logSeeMore("+ i +","+ devlogMax +",0)");
			$("#seeMore").attr("onmousedown", "logSeeMore("+ i +","+ devlogMax +",1)");
			if (i == devlogMax) {
				$("#seeMore").css("display", "none");
			}
		}
	}else{
		var new_nbShow = nbShow - 3, i = nbShow;

		while (i > new_nbShow && i > 3) {
			$(".devlogs_list_"+i).css("display", "none");
			$("#seeLess").attr("onmousedown", "logSeeMore("+ i +","+ devlogMax +",0)");
			$("#seeMore").attr("onmousedown", "logSeeMore("+ i +","+ devlogMax +",1)");
			$("#seeMore").css("display", "inline-block");
			i--;
		}
		if (i <= 3) {
			$("#seeLess").css("display", "none");
		}
	}
}