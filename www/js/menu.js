var menu = {
	toggle : function() {
		if ($(".menu").css("display") != "none") {
			$(".menu").fadeOut();
		} else {
			$(".menu").fadeIn();
		}
	},
	init : function() {
		$(".menu-item").each(function() {
			$(this).click(function() {
				$.get($(this).attr("src"), function(res) {
					//console.log("::::", res);
					var processingCode = res;
					var jsCode = Processing.compile(processingCode).sourceCode;
					console.log(jsCode);
					var myCanvas = document.getElementById('__processing0');
					//eval(jsCode);
					p = new Processing(myCanvas, jsCode);
				});
				menu.toggle();
			});
		});

	},
};

$(document).ready(function() {
	menu.init();

});
