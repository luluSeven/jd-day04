/**
 * Created by ∆ﬂ√√ on 2017/12/25.
 */
window.addEventListener('load',function(){
    leftSwipe();
    rightSwipe();
})

function getCategoryHeight() {
    var windowHeight = document.documentElement.clientHeight;
    console.log(windowHeight);
    var topbarHeight = document.querySelector('#topbar');
    var categoryHeight = windowHeight - topbarHeight;

    document.querySelector('.category-left').style.height = categoryHeight + 'px';
    document.querySelector('.category-right').style.height = categoryHeight + 'px';
}

function leftSwipe() {
    var slideul = document.querySelector('.category-left ul')
    var startY = moveY = distanceY = currentY = 0;
    var parentHeight = document.querySelector('.category-left').offsetHeight;
    var childHeight = document.querySelector('.category-left ul').offsetHeight;
    var maxSlide = 0 + 200;
    var minSlide = parentHeight - childHeight - 200;
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;

    slideul.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    })



    slideul.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        if((currentY + distanceY) < maxSlide && (currentY + distanceY) > minSlide){
            slideul.style.transform = 'translateY(' + (currentY + distanceY) + 'px)';
            slideul.style.transition = 'none';
        }
    })

    slideul.addEventListener('touchend',function(e){
        currentY += distanceY;

        if(currentY > maxPosition){
            currentY = maxPosition;
        }else if (currentY < minPosition){
            currentY = minPosition;
        }

        slideul.style.transform = 'translateY(' + currentY + 'px)';
        slideul.style.transition = 'all 0.2s';
    })

    var lis = document.querySelectorAll('.category-left li')

    slideul.addEventListener('click',function(e){
        var li = e.target.parentNode;
        for(var i = 0; i < lis.length; i++){
            lis[i].classList.remove('active');
            lis[i].dataset.index = i;
        }

        li.classList.add('active');

        var slideHeight = -li.dataset['index'] * li.offsetHeight;

        if(slideHeight < minPosition){
            currentY = minPosition;
        }else{
            currentY = slideHeight;
        }

        slideul.style.transform = 'translateY(' + currentY + 'px)';
        slideul.style.transition = 'all 0.2s';

    })
}

function rightSwipe(){
    var myScroll = new IScroll('.category-right',{
        'mouseWheel':true,
        'scrollbars':true,
        'interactiveScrollbars':true
    })
}