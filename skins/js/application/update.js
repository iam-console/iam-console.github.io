

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
	
	// 应用ID
	var id=location.hash.substring(1);
	$(".ue-vmenu ul :nth-child(1) a").attr("href","#/applications/"+id);
	$(".ue-vmenu ul :nth-child(2) a").attr("href","#/applications/"+id+"/accounts");
	$(".ue-vmenu ul :nth-child(3) a").attr("href","#/applications/"+id+"/accountstore");
	$(".ue-vmenu ul :nth-child(4) a").attr("href","#/applications/"+id+"/groups");
	$(".ue-vmenu ul :nth-child(5) a").attr("href","#/applications/"+id+"/accountPolicy");

	// 初始化页面
	$("#resource iframe").attr("src","details.html");

	// Details页面
	$(".ue-vmenu ul :nth-child(1) a").click(function(){
		$("#resource iframe").attr("src","details.html");
	});

	// Accounts页面
	$(".ue-vmenu ul :nth-child(2) a").click(function(){
		var loadUrl=$(".ue-vmenu ul :nth-child(2) a").attr("href");
		$("#resource iframe").attr("src","account.html"+loadUrl);
	});

	// AccountStore账号库页面

	$(".ue-vmenu ul :nth-child(3) a").click(function(){
		var loadUrl=$(".ue-vmenu ul :nth-child(3) a").attr("href");
		$("#resource iframe").attr("src","accountstore.html"+loadUrl);
	});

	// Group页面
	$(".ue-vmenu ul :nth-child(4) a").click(function(){
		var loadUrl=$(".ue-vmenu ul :nth-child(3) a").attr("href");
		$("#resource iframe").attr("src","group.html"+loadUrl);
	});
	
}

