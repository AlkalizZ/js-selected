/**
 * Created by Alkali on 15/8/15.
 */
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
        var selected = [],
            unselected = [];
        for(var i = 0; i < checkBox.length; i++){
            if(checkBox[i].checked){
                selected.push(checkBox[i]);
            }else{
                unselected.push(checkBox[i]);
            }
        }
        for(var i = 0; i < selected.length; i++){
            selected[i].checked = false;
        }
        for(var i = 0; i < unselected.length; i++){
            unselected[i].checked = "true";
        }
    }
}

MyQuery.addHandler(selectAllBtn, "click", function(){
    Check.selectAll();
});
MyQuery.addHandler(reversedBtn, "click", function(){
    Check.reversed();
});