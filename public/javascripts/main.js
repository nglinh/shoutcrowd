var jPM={};$(function(){function b(a,b,c){$('<div id="tooltip">'+c+"</div>").css({top:b-16,left:a+20}).appendTo(".container").fadeIn()}jPM=$.jPanelMenu({menu:"#menu",trigge:".menu-trigger",animated:!1,beforeOpen:function(){matchMedia("only screen and (min-width: 992px)").matches&&$(".sidebar").css("left","250px")},beforeClose:function(){$(".sidebar").css("left","0"),$(".writer-icon, .side-writer-icon").removeClass("fadeOutUp")}}),jPM.on(),$(".select-posts, .select-categories").on("click",function(){$(".home-page-posts").toggleClass("hide"),$(".home-page-categories").toggleClass("hide"),$(".select-posts").toggleClass("active"),$(".select-categories").toggleClass("active"),$(".home-footer").toggleClass("hide")}),$(".writer-icon").on("click",function(){$(this).addClass("fadeOutUp")});var a=[{data:[[11,540],[12,600],[13,645],[14,672],[15,591],[16,789],[17,794],[18,732],[19,600],[20,520],[21,500]],color:"#69d193"},{data:[[11,500],[12,523],[13,530],[14,423],[15,543],[16,624],[17,732],[18,580],[19,580],[20,430],[21,450]],color:"#4761e2",points:{radius:4,fillColor:"#4761e2"}}];if($("#graph-lines").length>0){$.plot($("#graph-lines"),a,{series:{points:{show:!0,radius:5},lines:{show:!0},shadowSize:0},grid:{color:"#646464",borderColor:"transparent",borderWidth:20,hoverable:!0},xaxis:{tickColor:"transparent",tickDecimals:0},yaxis:{tickSize:100,label:"Price (USD)"}}),$.plot($("#graph-bars"),a,{series:{bars:{show:!0,barWidth:.9,align:"center"},shadowSize:0},grid:{color:"#646464",borderColor:"transparent",borderWidth:20,hoverable:!0},xaxis:{tickColor:"transparent",tickDecimals:0},yaxis:{tickSize:1e3}}),$("#graph-bars").hide(),$("#lines").on("click",function(a){$("#bars").removeClass("active"),$("#graph-bars").fadeOut(),$(this).addClass("active"),$("#graph-lines").fadeIn(),a.preventDefault()}),$("#bars").on("click",function(a){$("#lines").removeClass("active"),$("#graph-lines").fadeOut(),$(this).addClass("active"),$("#graph-bars").fadeIn().removeClass("hidden"),a.preventDefault()});var c=null;$("#graph-lines, #graph-bars").bind("plothover",function(a,d,e){if(e){if(c!=e.dataIndex){c=e.dataIndex,$("#tooltip").remove();var f=e.datapoint[0],g=e.datapoint[1];b(e.pageX,e.pageY,g+" readers on the"+f+"th")}}else $("#tooltip").remove(),c=null}),$(".chart-visitors").easyPieChart({animate:3e3,barColor:"#4761e2",lineWidth:20,lineCap:"butt",size:150}),$(".chart-downloads").easyPieChart({animate:4200,barColor:"#4761e2",lineWidth:20,lineCap:"butt",size:150})}var d=$(window).height();$(".hero-image-404").css("height",d)});
