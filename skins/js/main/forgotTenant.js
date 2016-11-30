$(function() {

	initRegisterPage();

})

//////////////////////////////////////////////////  导航栏     /////////////////////////////////////////////////

function initRegisterPage() {
	var registerUrl = "http://localhost:8080/iam-rest/v1/register";

	$(".btn-register").click(function() {
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
				if(data["result"]==="fail"){
					alert("register fail");
				}else{
					window.location.replace("login.jsp");					
				}
			}
		});
	});

}
