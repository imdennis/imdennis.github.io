$(document).ready(function(){
    $(document).ready(function() {
        
        //input
        var duration=0;
        var height=0;
        var width=0;
        var radius=0;
        var nodes=0;
        var mode=0;
        //array
        var array_left = [];
        var array_top  = [];
        var array_deg = [];
        
        function loop(x) {
        var div = $("#user"+x);
        var p = div.position();
        
            if(p.left>width-radius*2-6 || p.left<0){
                array_left[x] = -array_left[x];
                array_deg[x] = -array_deg[x];
            }
            if(p.top>height-radius*2-6 || p.top<0){
                array_deg[x] = -array_deg[x];
            }
            
            array_top[x] = array_deg[x]*array_left[x];
            div.animate(
            {
                left:'+='+array_left[x],
                top: '+='+array_top[x]
            }, 1, 'linear', function() {
            loop(x);
        });
        }
              
        function loop2(x) {
        var div = $("#user"+x);
        
        var p = div.position();
        if(p.left>width-radius*2-6){
            div.css({top: height-p.top-radius*2-6, left: 0});
        }
        if(p.left<0){
            div.css({top: height-p.top-radius*2-6, left: width-radius*2-6});
        }
        if(p.top>height-radius*2-6){
            div.css({top: 0, left: width-p.left-radius*2-6});
        }
        if(p.top<0){
            div.css({top: height-radius*2-6, left: width-p.left-radius*2-6});
        }
        div.animate(
            {
                left:'+='+array_left[x],
                top: '+='+array_top[x],
            }, 1, 'linear', function() {
            loop2(x);
        });
        }
 
        
        function loop3(x) {            
        var div = $("#user"+x);
            var $ds_left = Math.random()*(width-radius*2-6);
            var $ds_top  = Math.random()*(height-radius*2-6);
            div.animate(
            {
                left:$ds_left,
                top: $ds_top
            }, "slow", 'linear', function() {
            loop3(x);
        });
        }
        
        function timer(){
            var i;
            for(i =0;i<nodes;i++){
                $("#user"+i).stop();
            }
            $("#start").attr("disabled", false);
            
        }
    
    $("#start").click(function(){
        //stop simulation
        var i;
        for(i =0;i<nodes;i++){
            $("#user"+i).stop();
        }
        
        //update value
        array_left=[];
        array_top=[];
        array_deg=[];
        duration = $("#dur").val();
        nodes = $("#nod").val();
        radius = $("#rd").val();
        radius-=3;
        mode = $("#sel").prop("selectedIndex");
        height = $("#hei").val();
        width = $("#wid").val();
        
        $("#space").css({
            height: height,
            width: width
        })
        
        $("#space").empty();
        
        for(i=0;i<nodes;i++){
            if(Math.random()>0.5){
                array_left.push(2);
            }else{
                array_left.push(-2);
            }
            if(Math.random()>0.5){
                array_top.push(2);
            }else{
                array_top.push(-2);
            }
            var tan = Math.tan((Math.random()*11+5)/36*Math.PI);
            if(Math.random()>0.5){
                tan = -tan;
            }
            array_deg.push(tan);
            $("#space").append("<div class='user' id='user"+i+"'></div>");
            $("#user"+i).css({
                top: Math.floor(Math.random()*(height-radius*2)), 
                left: Math.floor(Math.random()*(width-radius*2)),
                background: "#"+
                Math.floor(Math.random()*16).toString(16)+
                Math.floor(Math.random()*16).toString(16)+
                Math.floor(Math.random()*16).toString(16),
                height:radius*2,
                width:radius*2
                             });

        }
        
        setTimeout(timer,duration*1000);
        $("#start").val("SIMULATING...")
        $("#start").attr("disabled", true);
        
        switch(mode){
            case 0:
                for(i=0;i<nodes;i++){
                    loop(i);
                }
                break;
            case 1:
                for(i=0;i<nodes;i++){
                    loop2(i);
                }
                break;
            case 2:
                for(i =0;i<nodes;i++){
                    loop3(i);
                }
                break;
            default:break;
        }
    });
})});