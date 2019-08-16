
//表单提交
$('#userForm').on('submit',function(){
    var formDate = $(this).serialize();
    // console.log(formDate);
    $.ajax({
        url : '/users',
        type : 'post',
        data :  formDate,
        success : function(){
            location.reload();
        },
        error: function(){
            alert('提交失败');
        }
    })
    //禁用表单默认提交
    return false;
});

//头像提交
$('#modifyBox').on('change','#avatar',function(){
    var formData = new FormData();
    //this.files获取选择的文件路径
    formData.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url : '/upload',
        data : formData,
        // 告诉ajax 方法不要解析请求参数
        processData : false,
        // 告诉ajax不要设置请求参数的类型
        contentType: false,
        success : function(result){
            console.log(result[0].avatar);
            // 给显示图片的img设置src路径
            $('#xianshi').attr('src',result[0].avatar)
            $('#hiddenText').val(result[0].avatar);
        }

    })
});

//渲染页面 //加载页面数据
$.ajax({
    type:'get',
    url : '/users',
    success : function(result){
        // console.log(result);
        var html = template('userTpl',{
            data : result
        });
        $('#tbodyTpl').html(html)
    }
});
// 编辑按钮获取数据到修改页面
$('#tbodyTpl').on('click','.bianji',function(){
    var id = $(this).attr('data-id')
    // console.log(id);
    
    $.ajax({
        type : 'get',
        url : '/users/'+ id,
        success : function(result){
            var html = template('updateTpl',result)
            $('#modifyBox').html(html)
            
        }
    })
}); 

//修改数据
$('#modifyBox').on('submit','#modifyForm',function(){
    //获取表单所有数据 serialize
    var formdata = $(this).serialize();
    var id  = $(this).attr('data-id');
    $.ajax({
        type :'put',
        url : '/users/' + id,
        data : formdata,
        success : function(){
            location.reload();
        }
    })
    // console.log(id);
    return false;
});

//点击删除按钮删除数据
$('#tbodyTpl').on('click','.delete',function(){
    var id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
        type : 'delete',
        url : '/users/'+id,
        success : function(){
            location.reload();
        }
    })
});
//全选按钮控制
var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany');
selectAll.on('change',function(){
    var status = $(this).prop('checked');
    // alert(status);
    if(status){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
    //查询input 标签下的选中状态把 全选的状态赋给它
    $('#tbodyTpl').find('input').prop('checked',status);
});
//事件委托
$('#tbodyTpl').on('change','.userStatus',function(){
    //查询出所有的input标签
    var input = $('#tbodyTpl').find('input')
    //如过相等让全选按钮的变为选中状态
    // input.length == input.filter(':checked').length
    //判断所有input标签的长度跟选中的input标签的长的
    if(input.length == input.filter(':checked').length){
        selectAll.prop('checked',true);
    }else{
        selectAll.prop('checked',false);
    }
    //如果有选中的input标签让批量删除按钮显示出来
    if(input.filter(':checked').length > 0){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
});

deleteMany.on('click',function(){
    var ids = [];
    //获取选中的input标签
    var checkedUser = $('#tbodyTpl').find('input').filter(':checked')

    //循环
    checkedUser.each(function(index,elemte){
        ids.push($(elemte).attr('data-id'))
    })
    console.log(ids);

    var confirmIs = confirm('确定要删除吗');
    if(confirmIs){
        $.ajax({
            type : 'delete',
            url : '/users/'+ids.join('-'),
            success : function(){
                location.reload();
            }
        })
    }
})