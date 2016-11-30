function doSession(){
	var accountToken=$.cookie("accountToken");
	$.ajax({
		type : "GET",
			url : accountToken,
			contentType : "application/json;charset=utf-8",
			dataType : "json",
			success : function(data) {
				if(data["name"]){
					return true;
				}else{		
					return false;
				}
			},
			error : function(e) {
				return false;
			}
	});
}