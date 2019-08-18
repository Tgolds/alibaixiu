//所属分类显示
$.ajax({
    type : 'get',
    url : '/categories',
    success : function(result){
        // console.log(result);
        //模板引擎获取不需要加#号
        console.log(result);
        
        var html = template('fenleiTpl',{data:result});        
        $('#category').html(html)
    }
});
//获取选择文件按钮
$('#feature').on('change',function(){
    var formData = new FormData();
    var file = this.files[0]
    formData.append('cover',file);
    $.ajax({
        type : 'post',
        url : '/upload',
        data : formData,
        processData : false,
        contentType : false,
        success : function(result){
            console.log(result);
            $('#thumbnail').val(result[0].cover)
        }
    });
});
$('#addArticle').on('submit',function(){
    //获取表单数据
    // $(this).serialize
    var formDate = $(this).serialize();
    $.ajax({    
        type : 'post',
        url : '/posts',
        data : formDate,
        success : function(){
            location.href = '/admin/posts.html'
        }
    }); 
    return false;
});