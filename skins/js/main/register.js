var URL=$.cookie("URL");
var registerUrl="";

$(function() {

	initContext();
	initRegisterPage();

})

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
		registerUrl=URL+"/admin/register";
	}

	
}



function initRegisterPage() {

	$(".iam-submit-btn").click(function() {
		var formData = {};
		formData["username"] = $("#username").val();
		formData["email"] = $("#email").val();
		formData["password"] = $("#password").val();
		formData["password2"] = $("#password2").val();

		$.ajax({
			type : "POST",
			url : registerUrl,
			contentType : "application/json;charset=utf-8",
			dataType : "json",
			data : JSON.stringify(formData),
			success : function(data) {
				if(data["result"]=="Fail"){
					clearForm();
				}else{
					$.cookie("tenant",data["result"]);
					window.location.replace("login.html");					
				}
			}
		});
	});

}

////////////////  辅助函数  ///////////////

function clearForm(){
	$(":input").val("");
}
