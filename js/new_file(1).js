//思路：  1.页面刷新或者一上来，先根据后台获取是否有点赞并且显示点赞数
//2.分两种情况 :1)已经点赞: 点击则取消点赞并且减少点赞数
//			  2)没点赞: 点击则点赞并设置点赞数或增加点赞数
//3.你每次设置点赞或取消点赞时都要根据接口像后台发送 只有这样才能记录你是否已经点赞，页面刷新时候才能获取你之前的点赞记录

//备注：ajax 里的URL是后台给你的接口地址  data里的参数也是你和后台协商的。



//默认获取点赞情况点赞数
getFn();

//设置或取消点赞
$("span").click(function(){
	var onOff = $(this).attr("onOff");
	if(onOff=="true"){
		setFn(1);
	}else{
		setFn(0);
	}
});
//==== set  === 设置点赞或者取消赞

function setFn(Num){
	
	if(Num=="0"){//如果传0 则取消赞 并且传入赞数为0
		var onOff_flag = 0;
	}else{//如果传1 则设置点赞 并且传入赞数为 1
		var onOff_flag = 1;
	}
	$.ajax({
		type:"post",
		url:setSecurityUrl,
		async:true,
		data:{
			"ceiling":Num,//点赞数
			"flag": onOff_flag//是否点赞开关
		},
		dataType:"json"
	}).done(function(data){
		console.log(data)
		//成功后做的事、、、你自己写
		getSecurityFn()
	}).fail(function(data){//失败
		console.log(data)
	});

}

//==== get === 获取点赞情况的函数

function getFn(){
	$.ajax({
		type:"get",
		url:getSecurityUrl,
		async:true,
		dataType:"json"
	}).done(function(data){
		console.log(data)
		if(data.flag==1){//这个data.flag是根据后台给你的参数那一条是显示是否点赞的参数 比如是flag = 1位开，flag=0位关。根据这个进行判断
			//如果有点赞。。。
			
		}else if(data.flag==0){
			//如果没有有点赞。。。
		}
		
	}).fail(function(){//失败
		
	});
}
