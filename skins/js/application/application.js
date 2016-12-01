
/////////////////// 声明变量  ////////////////////
var context=$.cookie("URL");

////////////////// 主方法 ///////////////////////

$(function() {

	initContext();

	initTable();
	
	initCreateModal();
	
	initDelModal();
	
	$("#search2").click(function(e){
		search();
	});
	$("#search1").bind("keypress",function(event){
		if(event.keyCode == "13"){
			search();
        }
	})
	
})



//////////////////////////////////////////////////  表格      /////////////////////////////////////////////////
function initContext(){

	if(context==null){
		context="http://dev.imaicloud.com/iam";
	}
}

function initTable() {
	var options = {
		ordering : false
	};

	var getAllUrl=context+"/v1/applications";
	grid = new L.FlexGrid("dataList", getAllUrl);
	grid.setParameter("start", "1");
	grid.setParameter("limit", "10");
	grid.init(options);
}

//表格渲染1：Checkbox
function rendCheckbox(data, type, full) {
	var checkboxDom='<input type="checkbox" value="' + data + '" name="selectId"/>';
	return checkboxDom;
}

//表格渲染2：Button
function rendBtn(data, type, full) {	
	var delBtnDom = "<a href=\"javascript:showDelModal('" + data  + "')\">删除</a>";
	var editBtnDom = "<a href=\"javascript:showEditPage('" + data + "')\">编辑</a>";
	return editBtnDom + "&nbsp;&nbsp;&nbsp;" + delBtnDom;
}

//////////////////////////////////////////////////   创建应用    ////////////////////////////////////////////

function initCreateModal(){
	$("#createCancelBtn").click(function() {
		$("#createModal").modal("hide");
	});
	
	$("#createBtn").click(function() {
		var formData={};

		formData["name"]=$("#appName").val();
		formData["status"]=$("#appStatus input:checked").val();
		formData["description"]=$("#appDes").val();
		
		var createUrl=context+"/v1/applications";		
		$.ajax({
			type : "POST",
			async:true,
			url : createUrl,
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			data : JSON.stringify(formData),
			success : function() {
				grid.reload();
			},
			error: function(e) {
				
			}
		});
	});
		
}

////////////////////////搜索应用  //////////////////////

//搜索框
function search(){
	var queryParams=$("#search1").val();
	var searchUrl=context+"/v1/applications?";
	searchUrl = encodeURI(searchUrl);
	searchUrl = encodeURI(searchUrl);
	
	grid = new L.FlexGrid("appList", searchUrl);
	grid.setParameter("start", "1");
	grid.setParameter("limit", "10");
	grid.init(options);
}


////////////////////////////  编辑应用 /////////////////////////////////////

function showEditPage(data){
	var id=data.substr(data.lastIndexOf("/")+1);
	window.location="update.html#"+id;
}


//////////////////////////// 删除应用  //////////////////////////////////////////

function initDelModal(){

	$("#delCancelBtn").click(function() {
		$("#delModal").modal("hide");
	});	
	
	$("#check01").bind("change",function(){
		if($("#check01 input:checked")){
			$("#delBtn").removeAttr("disabled");
		}else{
			$("#delBtn").attr("disabled","disabled");
		}
	});
		
}

function showDelModal(data){
	$("#delModal").modal("show");	

	$("#delBtn").click(function() {
		var delUrl=data;
				
		$.ajax({
			type : "DELETE",
			url : delUrl,
			success : function() {
				grid.reload();
			},
			error: function(e) {
			}
		});
	});
}

