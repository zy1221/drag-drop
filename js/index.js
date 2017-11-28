$('.menu-top img:nth-of-type(1)').bind('click',handleClick);
function handleClick(){
    var leftValue=$('.menu').css('left');
    if(leftValue=='0px'){
        $('.menu').css('left','-84px');
        // $('.menu-top img').attr('src','./images/right.jpg');
        $('#cesium-container').css({
            'left':'46.5px',
            'width':'96.5%'
        });
    }else{
        $('.menu').css('left','0px');
        // $('.menu-top img').attr('src','./images/left.jpg');
        $('#cesium-container').css({
            'left':'135px',
            'width':'90%'
        })
    }
}

function functionImgClick(){
    alert('OK');
 }
//从功能列表拖拽到快捷菜单。
$(".function-list .draggable").bind("mousedown",function(event){
    var draggableDiv = $("#draggableDiv");
    var clickElement=$(this).clone();
    var clickElementId="quick-"+$(this)[0].id;
    $(clickElement).attr("id",clickElementId);
    $(clickElement).css({
        "width": "40px",
         "height": "40px",
    });
    var currentdiv=$(this).offset();
    $(draggableDiv).css({
        "display": "block",
        "height": 0,
        "top": currentdiv.top,
        "left": currentdiv.left
    });
    draggableDiv.trigger(event);

//拖动元素时鼠标的位置
    var dragDivLeft = 0;
    var dragDivTop = 0;
    $("#draggableDiv").draggable({
        containment:"parent",
        drag: function(event, ui){
            var element=event.target||event.srcElement;//兼容IE和谷歌
            $("#draggableDiv").css({ "width": "40px", "height": "40px" });
            $("#draggableDiv").append(clickElement);
            dragDivLeft = element.offsetLeft;
            dragDivTop = element.offsetTop;
        },
        stop: function () {
            $("#draggableDiv").html("");
            $("#draggableDiv").css({ "height": "0" });
        }
    });
    $("#menu-bottom").droppable({
        drop:function(event,ui){
            var targetParent=$("#menu-bottom");
            var len=targetParent[0].childNodes.length;
            var isExist=false;
            if($("#draggableDiv").html()==""){
                return;
            }
            var chileId=$($("#draggableDiv").html())[0].id;
            var selector='#menu-bottom #'+chileId
            if(len>0){
                for(var i=0; i<len; i++){
                    if(chileId == targetParent[0].childNodes[i].id){
                        isExist=true;
                    }
                }
            }else{
                isExist=false;
            }
            if(!isExist){
                targetParent.append($("#draggableDiv").html());
                $(selector).bind("mousedown",handleRemoveQuickMenu)
            }else{
                alert("该功能已添加到快捷菜单");
                return;
            }
            alert("添加成功");
        },
    });

})
//移除拖动
function handleRemoveQuickMenu(event){
    var draggableRemoveDiv = $("#draggableRemoveDiv");
    var clickElement=$(this).clone();
    var mouseDownIdSetector="#"+$(this)[0].id;
    $(clickElement).css({
        "width": "40px",
         "height": "40px",
    });
    var currentdiv=$(this).offset();
    $(draggableRemoveDiv).css({
        "display": "block",
        "height": 0,
        "top": currentdiv.top,
        "left": currentdiv.left
    });
    draggableRemoveDiv.trigger(event);

    var dragDivLeft = 0;
    var dragDivTop = 0;
    $("#draggableRemoveDiv").draggable({
        drag:function(event, ui){
            var element=event.target||event.srcElement;//兼容IE和谷歌
            $("#draggableRemoveDiv").css({ "width": "40px", "height": "40px" });
            $("#draggableRemoveDiv").append(clickElement);
            dragDivLeft = element.offsetLeft;
            dragDivTop = element.offsetTop;
        },
        stop:function(event,ui){    
            $("#draggableRemoveDiv").html("");
            $("#draggableRemoveDiv").css({ "height": "0" });
        }
    })
    $("#cesium-container").droppable({
        drop:function(event,ui){
            $("#menu-bottom").children(mouseDownIdSetector).remove();
        }
    })
}