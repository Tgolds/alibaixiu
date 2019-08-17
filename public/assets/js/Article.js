//所属分类显示
$.ajax({
    type : 'get',
    url : '/categories',
    success : function(result){
        console.log(result);
        //模板引擎获取不需要加#号
        var html = template('fenleiTpl',{data:result});        
        $('#category').html(html)
    }
});
  