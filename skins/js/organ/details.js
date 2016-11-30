

/////////////////// 声明变量  ////////////////////

var host=window.location.host;
var protocol=window.location.protocol;
var context=protocol+"//"+host+"/iam-rest";
var id=location.hash.substring(1);
var href=context+"/v1/organizations/"+id;

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
			$("#organHref").attr("href",href);	
			$("#organHref").text(href);				
			$("#organId").val(id);
			$("#organName").val(data["name"]);
			$("#nameKey").val(data["nameKey"]);
			$("#organDes").text(data["description"]);
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
	formData["name"]=$("#organName").val();
	formData["nameKey"]=$("#nameKey").val();
	formData["status"]=$("#organStatus input:checked").val();
	formData["description"]=$("#organDes").val();

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
