

/////////////////// 声明变量  ////////////////////
var context=$.cookie("URL");
var id=location.hash.substring(1);
var href=context+"/v1/applications/"+id;

///////////////////////////  主方法  /////////////////////////////////

$(function() {

	initPage();	
	
})

////////////////////////// 初始化表单  //////////////////////////////////
function initPage(){

	$("#saveBtn").click(function() {
			saveForm();
		}
	);

	loadForm();
}


function loadForm(){
	$.ajax({
		type:"GET",
		url : href,		
		success : function(data) {
			$("#appHref").attr("href",data["href"]);	
			$("#appHref").text(data["href"]);				
			$("#appId").text(data["id"]);
			$("#appName").val(data["name"]);
			$("#appDes").text(data["description"]);
			var status=data["status"];
			$("[name='statusRadio'] [value='"+status+"']").attr("checked",true);	
			$("#applications").after("<p>"+data["name"]+"</p>");
		},
		error:function(e){

		}
	});

}

////////////////////  保存信息  ////////////////////////

function saveForm() {
	var formData={};
	formData["name"]=$("#appName").val();
	formData["status"]=$("#appStatus input:checked").val();
	formData["description"]=$("#appDes").val();

	$.ajax({
		type : "POST",
		url : href,
		contentType:"application/json;charset=utf-8",
		dataType:"json",
		data : JSON.stringify(formData),
		success : function() {
			loadForm();
		},
		error: function(e) {
			
		}
	});
}
