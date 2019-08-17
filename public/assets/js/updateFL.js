//添加分类目录
$('#classification').on('submit',function(){
    var formDate = $(this).serialize()
    $.ajax({
        type : 'post',
        url : '/categories',
        data :formDate,
        success : function(){
            location.reload();
        }
    })
    return false;
})
//渲染页面
$.ajax({
    url : '/categories',
    type : 'get',
    success : function(result){
        var html = template('cateTpl',{data : result});
        $('#FenleiBox').html(html)
    }
});

//事件委托
$('#FenleiBox').on('click','.updataId',function(){
    var id = $(this).data('id');        
    $.ajax({
        type : 'get',
        url : '/categories/'+ id,
        success : function(result){
            var html = template('updataTpl',result);
            $('#updataBox').html(html)
        }
    })
})
//修改
$('#updataBox').on('submit','#updataification',function(){
    let formdata = $(this).serialize();
    var id = $(this).data('id');
    $.ajax({
        url : '/categories/'+id,
        type : 'put',
        data : formdata,
        success : function(){
            location.reload();
        }
    })
    return false;
})
//删除
$('#FenleiBox').on('click','.deleteId',function(){
    var id = $(this).data('id');
    $.ajax({
        type : 'delete',
        url : '/categories/'+ id,
        success : function(){
            location.reload();
        }
    });
});