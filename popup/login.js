
//chrome.storage.local.get(function(r){console.log(r);});
//chrome.storage.local.set({keyData:{}}); //clear storage.local
chrome.storage.local.get(['id','pwd'],function(result){
    document.querySelector("#id").setAttribute('value', result.id || '');
    document.querySelector("#pwd").setAttribute('value', result.pwd || '');
});

document.querySelector("#login").addEventListener("click", loginHandle);
document.addEventListener('keyup', function(e){ e.keyCode === 13 && loginHandle(e); });

function loginHandle(e){
        let id = document.querySelector("#id").value;
        let pwd = document.querySelector("#pwd").value;

        chrome.storage.local.set({id,pwd},function(){
            console.log("set storage....");
            chrome.runtime.sendMessage({id: id, pwd:pwd}, function(){
                console.log("background sendMessage: ", id,pwd);
                console.log("response: ", arguments);
            });
        });
};