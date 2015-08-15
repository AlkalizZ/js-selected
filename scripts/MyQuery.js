/**
 * Created by Alkali on 15/8/7.
 */
var MyQuery = {
    addHandler: function (oElement, sEvent, fnHandler) {
        oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent("on" + sEvent, fnHandler)
    },
    removeHandler: function (oElement, sEvent, fnHandler) {
        oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, fnHandler)
    },
    addLoadHandler: function (fnHandler) {
        this.addHandler(window, "load", fnHandler)
    },
    hasClass: function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    addClass: function (element, value) {
        if(!element.className){
            element.className = value;
        }else{
            var newClassName = element.className;
            newClassName += " " + value;
            element.className = newClassName;
        }
    },
    removeClass: function (obj, cls) {
        if (MyQuery.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },
    getTagList: function (element, tag) {
        if(!tag) return element.children;
        var list = element.children,
            tagList = [];
        for(var i = 0, len = list.length; i < len; i ++) {
            if(list[i].tagName.toLowerCase() == tag.toLowerCase()) {
                tagList.push(list[i]);
            }
        }
        return tagList;
    },
    constant: function(target,json,speed,callback){
        var timeScale = 1000 / 60,
            count = speed / timeScale,
            begin;

        if(target.timer){
            clearTimeout(target.timer);
        }

        for(var key in json){
            if(window.getComputedStyle){
                begin = parseFloat(window.getComputedStyle(target, null)[key]);
            }else{
                begin = parseFloat(target.currentStyle[key]);
            }
            target[key] = (json[key] - begin) / count;
        }
        target.timer = setInterval(function(){
            var oldValue,newValue;
            var stop = true;
            for(var key in json){
                if(window.getComputedStyle){
                    oldValue = parseFloat(window.getComputedStyle(target, null)[key]);
                }else{
                    oldValue = parseFloat(target.currentStyle[key]);
                }
                if(oldValue != json[key]){
                    stop = false;
                }
                if(target.addEventListener && Math.abs(oldValue - json[key]) < 1){
                    target.style[key] = json[key] + "px";
                }else if(!target,addEventListener && Math.abs(oldValue - json[key]) < 25){
                    target.style[key] = json[key] + "px";
                }else{
                    newValue = oldValue + target[key];
                    target.style[key] = newValue + "px";
                }
            }
            if(stop){
                clearInterval(target.timer);
                typeof callback == "function" && callback();
            }
        }, timeScale);
    },
    getObjStyle: function(obj, style) {
        if(obj.currentStyle)
            return obj.currentStyle[style];
        else if(window.getComputedStyle)
            return window.getComputedStyle(obj, null)[style];
        else
            return null;
    },
    getClassName: function(className){
        var el = [],
            _el = document.getElementsByTagName('*');
        for(var i=0; i<_el.length; i++){
            if (MyQuery.hasClass(_el[i], className)){
                el[el.length] = _el[i];
            }
        }
        return el;
    },
    move:function(target,json,speed,callback){//1.target目标2.json需求变化3.变化的速度4.动画完成后回调
        var timeScal = 1000/60,
            count = speed/timeScal,
            floorCount = Math.floor(count),
            counting = 0,
            timer,
            oldValue,
            distance,
            finalValue;
        if(!target.animation_final || !target.animation_old || !target.animation_distance){
            target.animation_final = {};
            target.animation_old = {};
            target.animation_distance = {};
        }
        for(var key in json){
            target.animation_final[key] = parseFloat(json[key]);//最后值等于传入的值
            if(key == "opacity"&&!target.addEventListener){ //ie8 传入的透明度为小数
                target.animation_old[key] = parseFloat(target.filters.alpha.opacity);
                target.animation_distance[key] = (parseFloat(json[key])*100 - parseFloat(target.animation_old[key]))/count;//每次移动的距离
            }else{
                target.animation_old[key] = parseFloat(MyQuery.getObjStyle(target,key));
                target.animation_distance[key] = (parseFloat(json[key]) - parseFloat(target.animation_old[key]))/count;
            }       
        }
        if(!timer){
            timer = setInterval(function(){
                for(key in json){
                    if(key == "opacity"){
                        if(!target.addEventListener){//ie8
                            oldValue = target.animation_old[key];
                            distance = target.animation_distance[key];
                            target.filters.alpha.opacity = (oldValue + distance);
                            target.animation_old[key] = oldValue + distance;
                        }else{
                            oldValue = target.animation_old[key];
                            distance = target.animation_distance[key];
                            target.style[key] = oldValue + distance;
                            target.animation_old[key] = oldValue + distance;
                        }
                    }else{
                        oldValue = target.animation_old[key];
                        distance = target.animation_distance[key];
                        target.style[key] = oldValue + distance + "px";
                        target.animation_old[key] = oldValue + distance;
                    }
                }
                //判断次数相等停止循环
                counting++;
                if(counting == floorCount){
                    for(key in json){
                        target.style[key] = json[key];
                    }
                    clearInterval(timer);
                    callback&&callback();
                }
            },timeScal)
        }
    }
};