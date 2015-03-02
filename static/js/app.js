
/*
 * global deviceHeight and deviceWidth parameter
 */
var dh = $(window).height(),
    dw = $(window).width(),
    bgWidth = 4972, //Raw picture widht in px
    bgHeight = 700, //Raw picture height in px
    whRatio = bgWidth / bgHeight,
    actualWidth = 4972/700 * dh;

/*
 *  resize the background image
 */
var resetBg = function(){
    dh = $(window).height(),
       dw = $(window).width(),
       actualWidth = 4972/bgHeight * (dh >= 700 ? dh : 700),
       offset = $(".site-content").offset();
    $(".site-content").height(dh >= 700 ? dh : 700).width(actualWidth);
    
    var gap = -1 * offset.left + dw - actualWidth;
    if(gap > 0){
        $(".site-content").css({
            "left": $(".site-content").offset().left + gap + "px"
        });
    }
    
    //reset progress bar bg
    var percentage = Math.abs(offset.left) / ($(".site-content").width() - $(window).width()),
            pw = $(".progress-bar").width(),
            
            leftPos = ((pw * 0.9 - 32)* percentage) + pw * 0.05;
        $(".progress-indicator").css({
            "left": leftPos + "px"
        });
}

var resetDog = function(){
    $(".sitting-dog").width(351 * $(window).height()/bgHeight);
}

var resetHotspot = function(){
    var hsh = 47/700 * $(window).height(),
        hsw = hsh;
    /*
       $("#hotspot-1").css({
       "left": 0.15446500402253 * actualWidth + "px",
       "top" : 432/700 * ($(window).height() >= 700 ? $(window).height() : 700)  + "px"
       });
       */

    $(".hotspot").each(function(){
        $(this).width(hsw).height(hsh);
        $(this).css({
            "left": $(this).attr("px")/bgWidth * actualWidth + "px",
            "top" : $(this).attr("py")/bgHeight * ($(window).height() >= bgHeight ? $(window).height() : bgHeight)  + "px"
        });
    });
}


var resetHotspotCt = function(){
    $(".hotspot-ct > div").each(function(){
        var w = $(this).attr("width"),
            h = $(this).attr("height"),
            nh = h/bgHeight * $(window).height(),
            nw = nh * w/h,
            ntop = ($(window).height() - nh)/2;
            $(this).height(nh).width(nw).css({"top": ntop + "px"});    
    })
}


var resize = function(){
    resetBg();
    resetDog();
    resetHotspot();
    resetHotspotCt();

    var fontRatio = 24/556,
        fontSize = $(".dump-contract").height() * fontRatio + "px";
    $(".sisters-count").css({'font-size': fontSize});
}

var scrollBg = function(pace){
    var offset = $(".site-content").offset();
    if(pace > 0){
        if(offset.left < 0){
            //scroll left
            $(".site-content").css({ 
                "left":  offset.left + (Math.abs(offset.left) > Math.abs(pace) ? Math.abs(pace) : Math.abs(offset.left))  + "px" 
            });
        }
    }else{
        if(offset.left + $(window).width() < actualWidth){
            //scrool right
            var rightOff = actualWidth - (Math.abs(offset.left) + $(window).width());
            $(".site-content").css({ 
                "left": offset.left -  (Math.abs(rightOff) > Math.abs(pace) ? Math.abs(pace) : Math.abs(rightOff)) + "px" 
            });
        }
    }
    
    if(offset.left < 0){
        var percentage = Math.abs(offset.left) / ($(".site-content").width() - $(window).width()),
            pw = $(".progress-bar").width(),
            
            leftPos = ((pw * 0.9 - 32)* percentage) + pw * 0.05;
        $(".progress-indicator").css({
            "left": leftPos + "px"
        });
    }
}



$(window).resize(function(e){
    resize();
});


/*
 * mousewheel event handler
 */
var wheeldelta = {
    x: 0,
    y: 0
};
var wheeling, leftOffset;

$(window).on('mousewheel', function (e) {
    e.preventDefault();
    if (!wheeling) {
        console.log('start wheeling!');
        //get starting position of offset.left
        var offset = $(".site-content").offset(),
            leftOffset = offset.left;
        
        //show progress bar
        $(".progress").fadeIn(100);
    }

    clearTimeout(wheeling);
    wheeling = setTimeout(function() {
        console.log('stop wheeling!');
        wheeling = undefined;

        // reset wheeldelta
        wheeldelta.x = 0;
        wheeldelta.y = 0;
        //position the dog
        var offset = $(".site-content").offset(),
             dogPace = leftOffset - offset.left;
        if(dogPace !== 0){
            if(Math.abs(offset.left)/actualWidth >= 699/bgWidth){ //dog's leftmost position is 699
                $(".sitting-dog").show();
            }else{
                $(".sitting-dog").hide();   
            }
        }
        
        //hide progress bar
        $(".progress").fadeOut(800);
    }, 250);

    var offset = $(".site-content").offset();
    if(Math.abs(offset.left)/actualWidth < 699/bgWidth){ //dog's leftmost position is 699
        $(".sitting-dog").fadeOut();
    }else{
        if(!$(".sitting-dog").is(":visible")){
            $(".sitting-dog").fadeIn();
        }
    }

    wheeldelta.x += e.deltaFactor * e.deltaX;
    wheeldelta.y += e.deltaFactor * e.deltaY;
    
    console.log("delta x : " +  wheeldelta.x + "delta y : " +  wheeldelta.y);
    
    
    var tan = Math.tan(5 * Math.PI/180);
    
    if( Math.abs(wheeldelta.y) / Math.abs(wheeldelta.x) > tan){
        scrollBg(e.deltaY * e.deltaFactor);
    }else{
        scrollBg(e.deltaX * e.deltaFactor);
    }
    
    
});

var magzineVideo = "<iframe height=100% width=100% src='http://static.youku.com/v/swf/qplayer.swf?VideoIDS=XODkxMDU5MjAw&isAutoPlay=true&isShowRelatedVideo=false&embedid=-&showAd=0' frameborder=0 allowfullscreen></iframe>"

var video2_1_1 = "<iframe height=100% width=100% src='http://static.youku.com/v/swf/qplayer.swf?VideoIDS=XODgyNzQzOTQ4&isAutoPlay=true&isShowRelatedVideo=false&embedid=-&showAd=0' frameborder=0 allowfullscreen></iframe>";


var video2_4_1 = "<iframe height=100% width=100% src='http://static.youku.com/v/swf/qplayer.swf?VideoIDS=XOTAxMTUzOTI0&isAutoPlay=true&isShowRelatedVideo=false&embedid=-&showAd=0' frameborder=0 allowfullscreen></iframe>";

$(function(){
    /* reset the background image when document is ready */
    resize();

    $(".hotspot").click(function(e){
        var index = $(this).attr("id"),
            container = "#" + index + "-ct",
            videotag = "#" +  index + "-player";
            
        $(container).fadeIn(function(){
                if(index == "hotspot-2-1"){
                //show video1
                if($(videotag)){
                    $(videotag).html(video2_1_1);
                }
            }else if(index == "hotspot-2-4"){
                if($(videotag)){
                    $(videotag).html(video2_4_1);
                }
            }
        });        
    });

    $(".hotspot-close").click(function(e){
        $(this).parent().parent().fadeOut();
        $(this).parent().find(".video_player").each(function(){
            $(this).html("");
        })
    });

    $(".mag-nav-mask").mouseover(function(){
        var index = $(this).attr("val");
        $(".mag-page-ct.active").removeClass("active").addClass("inactive");
        $("#mag-page-"+index).removeClass("inactive").addClass("active");
        
        
        if(index != 3){   //hide video
            $(".mag-page-3-vplayer-ct").fadeOut(function(){
                $(this).find(".video_player").html("");
            });
            $(".video_player_close").hide();
        }
    });
    /*
    $(".mag-nav-mask").mouseout(function(){
        $(".mag-page-ct.active").removeClass("active").addClass("inactive");
        $("#mag-page-0").removeClass("inactive").addClass("active");
    });*/
    
    /* hotspot 2-2 product development next page and prev page handler */
    $(".next-page-arrow").click(function(e){
        var marginLeft = "-" + $(this).parent().width() + "px";
        $(this).parents('.slide-wrapper').animate({marginLeft: marginLeft},600);
    });
    $(".prev-page-arrow").click(function(e){
        $(this).parents('.slide-wrapper').animate({marginLeft: "0"},600);
    });
    
    //show the video
    $(".mag-page-3-video-preview").click(function(e){
        $(".mag-page-3-vplayer-ct").fadeIn(function(){
            $(this).find(".video_player").html(magzineVideo);
        });
    })
    $(".mag-page-3-vplayer-ct").hover(function(){
        $(".video_player_close").fadeIn();
    });
    
    
    $(".video_player_close").click(function(){  
        $(".video_player_close").fadeOut(function(){
            $(".mag-page-3-vplayer-ct").fadeOut(function(){
                $(this).find(".video_player").html("");
            });
        });  
    });
});
