/**
 * Created by Alkali on 15/8/15.
 */
;(function(){
    var checkBox = document.querySelectorAll("input[name='checkbox']"),
        selectBtn = document.querySelector("#selectAll"),
        reversedBtn = document.querySelector("#reversed"),
        allBtn = document.querySelectorAll("input");
    selectBtn.addEventListener("click", function(){
        if(selectBtn.checked){
            for(var i = 0; i < checkBox.length; i++){
                checkBox[i].checked = true;
            }
            console.log(false);

        }else{
            for(var i = 0; i < checkBox.length; i++){
                checkBox[i].checked = false;
            }
        }
    }, false);
    reversedBtn.addEventListener("click", function(){
        for(var i = 0; i < checkBox.length; i++){
            checkBox[i].checked ? checkBox[i].checked = false : checkBox[i].checked = true;
        }
    }, false);

    for(var i = 0; i < allBtn.length; i++){
        allBtn[i].addEventListener("click", function(){
            var arr = 0;
            for(var i = 0; i < checkBox.length; i++){
                if(checkBox[i].checked){
                    arr++;
                }
            }
            arr == checkBox.length ? selectBtn.checked = true : selectBtn.checked = false;
        }, false);
    }
})();