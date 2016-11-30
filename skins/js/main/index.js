var URL=$.cookie("URL");


$(function() {


	//doSession();
	initContext();
	initPage();
})



//////////////////////////////////////////////////  导航栏     /////////////////////////////////////////////////

function initContext(){

	if(URL==null){
		$.getJSON("../data/iam-admin.json",function(data){	

		protocol=data["protocol"];
		host=data["host"];
		port=data["port"];
		context=data["context"];
		if("80"==port){
			URL=protocol+"://"+host+context;
		}else{
			URL=protocol+"://"+host+":"+port+context;
		}	

		loginUrl = URL+data["login"];
		$.cookie("URL",URL,{path:"/"});
		});
	}
}


	function initPage(){
		
		var initSrc=$("[href='#application']").attr("data-bind");
		$("#resource iframe").attr("src",initSrc);

		$("#myNav a").click(function() {
			var resourcePath=$(this).attr("data-bind");
			$("#resource iframe").attr("src",resourcePath);
		});		

		// 账号下拉菜单初始化
		$(".iam-admin ul :last-child a").click(function(){
			$.removeCookie("accountToken");
			window.location.replace("login.html");
		});			
	}

////////////////  辅助函数  //////////////////

function doSession(){
	var accountToken=$.cookie("accountToken");
	$.ajax({
		type : "GET",
			url : accountToken,
			contentType : "application/json;charset=utf-8",
			dataType : "json",
			success : function(data) {
				if(data["username"]){
					$(".ue-admin-title").text(data["username"]);
				}else{		
					window.location.replace("login.html");
				}
			},
			error : function(e) {
				window.location.replace("login.html");
			}
	});
}

