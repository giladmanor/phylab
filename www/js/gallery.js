var gallery = {
	view:false,
	show : function(item, exec) {
		gallery.shake(item);
		setTimeout(function() {
			$("#canvas-container").html("");
			app.init();
			$("#canvas-container").show();
			$(".gallery").hide();
			$(".glass").hide();
			exec();
		}, 1000);
		gallery.view = true;
	},
	back : function() {
		app.reset();
		$("#canvas-container").hide();
		$(".gallery").show();
		$(".glass").show();
		if(!gallery.view){
			navigator.app.exitApp();
		}else{
			gallery.view = false;
		}
		
	},
	shake : function(item) {
		$(item).addClass("shake");
		setTimeout(function() {
			$(item).removeClass("shake");
		}, 1000);
	},
};
