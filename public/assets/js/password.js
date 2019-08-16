$('#passwordUp').on('submit',function(){
    let formData = $(this).serialize();
    //把字符串转成数组,用split进行截取
    var str = formData.split('&');
    // console.log(str);
    // ["userPass=1", "newPass=2", "confirmPass=3"]
    var obj = {};
    str.forEach((v,i) => {
        var tempArr = v.split('=');
        console.log(tempArr);
        var name = tempArr[0];
        var value = tempArr[1];
        obj[name] = value;
    });
    // console.log(obj);
    // {userPass: "1", newPass: "2", confirmPass: "3"}
    if (obj.newPass != obj.confirmPass) {
        alert('两次输入的密码不一致');
        return false; 
    }
    var confirmUP = confirm('确认要修改吗')
    if(confirmUP){
        $.ajax({
            type : 'put',
            url : '/users/password',
            data :formData,
            success : function(){
                location.href = '/admin/login.html'
            }
        });
    }
    return false;
})