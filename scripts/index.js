/**
 * Created by Alkali on 15/8/15.
 */
;(function(){
    MyQuery.addLoadHandler(function(){
        var checkBox = document.getElementsByName("checkbox"),
            selectAllBtn = document.getElementById("selectAll"),
            reversedBtn = document.getElementById("reversed");
        var Check = {
            selectAll: function(){
                for(var i = 0; i < checkBox.length; i++){
                    checkBox[i].checked = "true";
                }
            },
            reversed: function(){
                for(var i = 0; i < checkBox.length; i++){
                    checkBox[i].checked ? checkBox[i].checked = false : checkBox[i].checked = true;
                }
            }
        }
        MyQuery.addHandler(selectAllBtn, "click", function(){
            Check.selectAll();
        });
        MyQuery.addHandler(reversedBtn, "click", function(){
            Check.reversed();
        });
    });
})();