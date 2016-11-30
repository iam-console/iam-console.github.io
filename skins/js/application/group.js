/////////////////// 声明变量  ////////////////////
var context=$.cookie("URL");

////////////////// 主方法 ///////////////////////

$(function() {

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
function initTable() {
	var options = {
		ordering : false
	};

	var getAllUrl=context+"/v1/groups?expand=directory";
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

	initSelectDirectory();

	$("#createCancelBtn").click(function() {
		$("#createModal").modal("hide");
	});


	//创建账号
		$("#createBtn").click(function() {
			var formData={};
			var directoryHref=$("#directories").find("option:selected").val()
			var createUrl=directoryHref+"/groups";
			
		formData["name"]=$("#name").val();
		formData["status"]=$("#status input:checked").val();
		formData["description"]=$("#description").val();
						
			$.ajax({
				type : "POST",
				url : createUrl,
				contentType:"application/json;charset=utf-8",
				dataType:"json",
				data : JSON.stringify(formData),
				success : function() {
					grid.reload();
				},
				error : function(e){

				}
			});
			
		});			
	
}

function initSelectDirectory(){
	$("#directories").empty().append("<option value=''>请选择目录</option>");
	var directoryUrl=context+"/v1/directories";
	$.ajax({
		  type:'GET',
		  url: directoryUrl,
		  success: function(data){
			  buildSelect(data);
		  },
		  error:function(e){
		  }
		});
}

function buildSelect(data){
	var items=data["items"];
	$.each(items,function(index,item){
		$("#directories").append("<option value='"+item.href+"'>"+item.name+"</option>");
	});
}

////////////////////////搜索应用  //////////////////////

//搜索框
function search(){
	var queryParams=$("#search1").val();
	var searchUrl=context+"/v1/groups?";
	searchUrl = encodeURI(searchUrl);
	searchUrl = encodeURI(searchUrl);
	
	grid = new L.FlexGrid("accountList", searchUrl);
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

