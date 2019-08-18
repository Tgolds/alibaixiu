//渲染页面
$.ajax({
    type : 'get',
    url : '/posts',
    success : function(result){
        // console.log(result);
        var html = template('postsTpl',result)
        $('#suoyouTpl').html(html)
        var page = template('pageTpl',result)
        $('#fenye').html(page)
    }
});
//分页
function changeClick(page){
    $.ajax({
        type : 'get',
        url : '/posts',
        data : {page : page},
        success : function(result){
            var html = template('postsTpl',result)
            $('#suoyouTpl').html(html)
            
            var page = template('pageTpl',result)
            $('#fenye').html(page)
        }
    });
}
// function formateDate(date) {
//     // 将日期时间字符串转换成日期对象
//     date = new Date(date);
//     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
//   }

//所有分类显示
$.ajax({
    type : 'get',
    url : '/categories',
    success : function(result){
        // console.log(result);
        var html  = template('flTpl',{data :result})
        // console.log(html);
        $('#fenleiTpl').html(html)
    }
})

//筛选所有文章
$('#shaixuan').on('submit',function(){
    //获取表单数据
    var formData = $(this).serialize()
    // console.log(formData);
    $.ajax({
        type : 'get',
        url : '/posts',
        //携带参数即按条件查询
        data : formData,
        success : function(result){
            // console.log(result);
            var html = template('postsTpl',result)
            $('#suoyouTpl').html(html)
            var page = template('pageTpl',result)
            $('#fenye').html(page)
        }
    });
//   alert(111)
    return false;
});
