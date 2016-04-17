$(function(){	 
    var thisId = window.location.hash;
    if(thisId =='#message'){				//基本信息
        $('.content').html(basic);
        $.initProv("#pro", "#city", "北京市", "北京市");
        $.initProv1("#pro1", "#city1", "北京市", "北京市");
        Height();//身高 体重验证
       

    }
    if(thisId == '#live'){					//生活方式
        $('#li1').removeClass('active');
        $('#li2').addClass('active');
        $('.content').html(liveway);
        liv();
    }
    if(thisId == '#disease_information'){	//疾病信息
        $('#li1').removeClass('active');
        $('#li3').addClass('active');
        $('.content').html(illnessMassage);
        disease();
    }
    if(thisId == '#Care_People'){			//关系的人
        $('#li1').removeClass('active');
        $('#li4').addClass('active');
        $('.content').html(Care_People);
    }
});
//生活方式
function liv(){
    $('.ddiv').delegate(".liveul li","click" ,function(){
            $('.liveul li').removeClass('livefs');
            $(this).addClass('livefs');
    });



}

//疾病信息
function disease(){
    $(".personage_illness ul li").toggle(
        function(){
            $(this).removeClass("one");
            $(this).addClass("two");
        },
        function(){
            $(this).removeClass("two");
            $(this).addClass("one");
        }
    );
    $(".family_illness ul li").toggle(
        function(){
            $(this).removeClass("one");
            $(this).addClass("two");
        },
        function(){
            $(this).removeClass("two");
            $(this).addClass("one");
        }
    )
}


//nav
$('.information_header .information_header_li').click(function(){
    $('.information_header_li').removeClass('active');
    $(this).addClass('active');
    var liID = $(this).attr("id");
    if(liID == 'li1'){
        $('.content').html(basic);
        $('.tcal').addClass('tcalInput');
        $.initProv("#pro", "#city", "北京市", "北京市");
        $.initProv1("#pro1", "#city1", "北京市", "北京市");
        Height();//身高 体重验证
    }
    if(liID == 'li2'){
        $('.content').html(liveway);
        liv();
    }
    if(liID == 'li3'){
        $('.content').html(illnessMassage);
        disease();
    }
    if(liID == 'li4'){
        $('.content').html(Care_People);
    }
});

//身高 体重验证
function Height(){
    $('#stature,.weigth').blur(function(event){
        var str = $(this).val();
        if(str.length!=0){
            var partten = /^\d+$/;
            if(!partten.test($(this).val())){
                $(this).val('');
            }
        }
    });
}

//next 基本信息保存下一步
function msgsave(userId){
	var SEX = $(".Sex input[name='Sex']:checked").val();
	if(SEX == 'man'){
		SEX = '男';
	}else if(SEX == 'woman'){
		SEX = '女';
	}
	alert(SEX);
	var NAME= $('#username').val();
	var MARRIAGESTATUS= $("#marriageM option:selected").text();
	var BIRTHPLACE=$("#city option:selected").text();
	var LIVEPLACE=$("#city1 option:selected").text();
	var CAREER=$("#s1 option:selected").text();//获取职业
    var DEGREE=$("#s2 option:selected").text();//获取学历
    var BIRTHDAY=$('.Wdate').val();//获取生日
    var HEIGHT= $('.height').val();//获取身高
    var WEIGHT=$('.weigth').val();//获取体重
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ihealth/rest/updateUser",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userId":userId,"sex":SEX,"name":NAME,"marriageStatus":MARRIAGESTATUS,"birthPlace":BIRTHPLACE,"livePlace":LIVEPLACE,"career":CAREER,"degree":DEGREE,"birthday":BIRTHDAY,"height":HEIGHT,"weight":WEIGHT}),
        dataType: "json",
        success: function (r) {
            if (r.result == "success") {
            	 console.log('保存成功');
            }else{
            	
            }
        }
       
    });
}



function on_click2(){   //生活方式
    $('.content').html(illnessMassage);
//    liv();
    $("#li3").addClass('active');
    $("#li2").removeClass('active');
}
function on_click3(){   //关心的人
    $('.content').html(Care_People);
//    liv();
    $("#li4").addClass('active');
    $("#li3").removeClass('active');
}














