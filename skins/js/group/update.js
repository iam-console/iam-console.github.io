

/////////////////////////////// 主方法 //////////////////////////////////////////////////

$(function() {

	initPage();
	
})



//////////////////////////////////////////////////  表格      /////////////////////////////////////////////////
function initPage() {

	$('.ue-vmenu').vmenu({
    autostart: 1,
    autohide: 0
	});
	

	var id=location.hash.substring(1);

		var initSrc=$("[href='#details']").attr("data-bind")+"#"+id;
		$("#resource iframe").attr("src",initSrc);

		$(".ue-vmenu a").click(function() {
			var resourcePath=$(this).attr("data-bind")+"#"+id;
			$("#resource iframe").attr("src",resourcePath);
		});			

}

