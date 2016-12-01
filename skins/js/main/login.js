var URL=$.cookie("URL",{path:"/"});
var loginUrl="";



$(function() {

	initContext();

	initMainPage();
});

//////////////////////////////////////////////////  导航栏     /////////////////////////////////////////////////

function initContext(){

	if(URL==null){
		$.getJSON("data/iam-admin.json",function(data){	

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
		$.cookie("URL",URL);
		});
	}
	else{
		loginUrl=URL+"/admin/login";
	}

	
}








function initMainPage() {

	initTenant();

	// 激活提示工具
	$("[data-toggle='tooltip']").tooltip();
	
	$(".iam-submit-btn").click(function() {
		var formData = {};
		formData["tenantKey"] = $("#tenantName").val();
		var email=$("#email").val();
		var password=$("#password").val();
		$.base64.utf8encode=true;
		var value=$.base64.encode(email+":"+password);

		formData["type"]="basic";
		formData["value"] = value;

		$.ajax({
			type : "POST",
			url : loginUrl,
			contentType : "application/json;charset=utf-8",
			dataType : "json",
			data : JSON.stringify(formData),
			success : function(data) {		
				var tenantId=data["tenant"];
				$.cookie("tenant",tenantId);
				window.location.replace("index.html");
				
			},
			error:function(e){
				clearForm();
			}
		});
	});

}

////////////////  辅助函数  ///////////////

function clearForm(){
	$(":input").val("");
}


function initTenant(){
	var tenantId=$.cookie("tenant");
	if(tenantId!=null){
		var tenantHref=URL+"/v1/tenants/"+tenantId;

		$.ajax({
		type:"GET",
		url:tenantHref,
		success:function(data){
			if(data["key"]!==null){
				$("#tenantName").val(data["key"]);
			}
		}
		});
	}
}