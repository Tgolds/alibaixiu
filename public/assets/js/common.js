$('#logout').on('click',function(){
    var isConfim = confirm('确定要退出吗')
    if(isConfim){
      
      $.ajax({
        type : 'post',
        url : '/logout',
        success : function(){
          location.href = 'login.html';
        },
        error :function(){
          alert('退出失败');
        }
      })
    }
  })