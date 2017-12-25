/**
 * Created by 七妹 on 2017/12/20.
 */
window.addEventListener('load', function () {
    searchFade();
    countDown();
    slide();
    console.log("24132");
});

/*搜索框渐变的特效*/
function searchFade() {

    window.addEventListener("scroll", searchOpacity)

    function searchOpacity() {
        var scrollTop = getScrollTop();
        var slideHeight = document.querySelector("#slide").offsetHeight;
        if (scrollTop < slideHeight) {
            var opacity = (scrollTop / slideHeight) * 0.8;
            console.log(opacity);
            document.querySelector("#topbar").style.backgroundColor = "rgba(255,0,0," + opacity + ")"
        } else {
            document.querySelector("#topbar").style.backgroundColor = "rgba(255,0,0,0.8)"
        }
    }
}

//获取滚动条滚动的距离
function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollPos = document.body.scrollTop;
    }
}

//倒计时
function countDown() {
    var nowTime = new Date().getTime() / 1000;
    var futureTime = new Date('2017-12-22 21:00:00').getTime() / 1000;
    var time = Math.floor(futureTime - nowTime);
    var spans = document.querySelectorAll('.seckill-time span');

    console.log(time);

    var timerID = setInterval(function () {

        time--;

        if (time <= 0) {
            time = 0;
            clearInterval(timerID);
        }

        var s = time % 60;
        var min = Math.floor(time % 3600 / 60);
        var h = Math.floor(time / 3600);

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(min / 10);
        spans[4].innerHTML = min % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
    }, 1000)

}

//轮播图
function slide() {
    var index = 1;
    var slideul = document.querySelector('#slide ul');
    var slidewidth = document.querySelector("#slide").offsetWidth;
    var timerID = null;
    starttime();

    function starttime(){
        timerID = setInterval(function(){
            index++;
            slideul.style.transform = 'translateX('+ -index*slidewidth +'px)';
            slideul.style.transition = "all 500ms ease";
        },1000)

    }

    var lis = document.querySelectorAll('#slide ol li');

    slideul.addEventListener('transitionend',function(){

        if(index >= 9){
            index = 1;

            slideul.style.transition = 'none';

            slideul.style.transform = 'translateX('+ (-index * slidewidth) +'px)';

        }

        if(index <= 0){
            index = 8;

            slideul.style.transition = 'none';

            slideul.style.transform = 'translateX('+ (-index * slidewidth) +'px)';

        }

        for(var i = 0; i<lis.length;i++){
            lis[i].classList.remove('active');
        }

        lis[index-1].classList.add('active');
    })

    var startX = moveX = distanceX = 0;

    slideul.addEventListener('touchstart',function(e){
        clearInterval(timerID);
        startX = e.touches[0].clientX;

    })

    slideul.addEventListener('touchmove',function(e){

        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        slideul.style.transform = 'translateX('+ (-index*slidewidth + distanceX)+'px)';
        slideul.style.transition = 'none';

    })

    slideul.addEventListener('touchend',function(){
        if(Math.abs(distanceX) > slidewidth / 3){
            if(distanceX > 0){
                index--;
            }else{
                index++;
            }

            slideul.style.transition = 'all 200ms ease';
            slideul.style.transform = 'translateX(' + (-index * slidewidth) + 'px)';
        }else{
            slideul.style.transition = 'all 200ms ease';
            slideul.style.transform = 'translateX(' + (-index * slidewidth) + 'px)';
        }

        starttime();
    })
}