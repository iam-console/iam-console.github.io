

/////////////////// 声明变量  ////////////////////
var host=window.location.host;
var protocol=window.location.protocol;
var context=protocol+"//"+host+"/iam-rest";
var id=location.hash.substring(1);
var href=context+"/v1/groups/"+id;

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
			$("#groupHref").attr("href",href);	
			$("#groupHref").text(href);				
			$("#groupId").val(id);
			$("#directoryHref").attr("href",data.directory.href);	
			$("#directoryHref").text(data.directory.name);	
			$("#groupName").val(data["name"]);
			$("#groupDes").text(data["description"]);
			var status=data["status"];
			$("[name='statusRadio'] [value='"+status+"']").attr("checked",true);	
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
