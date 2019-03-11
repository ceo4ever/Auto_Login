/**********************************************************************************/
/******************************* Initiated Data ***********************************/
/****************** created By kska32@gmail.com on 2018.12.21 *********************/

let keyData = [//init
    {id:'', pwd:'', origin:"http://192.168.124.205:8080/login", selectors:{id:"input[name=username]", pwd:"input[name=password]", click:"div.ui.fluid.large.primary.submit.button"}}
];

/**********************************************************************************/
/**********************************************************************************/
chrome.storage.local.get(['keyData'], function(result){
    if(result.keyData === undefined){
        chrome.storage.local.set({keyData}, function(){
            console.log("Initiate basic data successfully.");
        });
    }
});

let createdTabIds = [];
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
        let id = message.id;
        let pwd = message.pwd;
         //max times that message send to tab per a message received,
                        // because of chrome.tabs.sendMessage in update-event-handler.
        chrome.storage.local.get(['keyData'],function(result){
                keyData = result.keyData;

                keyData = keyData.map((v)=>{
                    if( v.id===undefined || v.id===null || v.id.toString().trim()==="") v.id = id;
                    if( v.pwd===undefined || v.id===null || v.pwd.toString().trim()==="") v.pwd = pwd;
                    return v;
                });

                chrome.tabs.onUpdated.addListener(function updatedHandler(tabid, changeinfo, tab){
                    if(tab.status==="complete" && createdTabIds.indexOf(tabid)>-1){
                        console.log("complete tabid:",tabid);
                        chrome.tabs.sendMessage(tab.id, {keyData,tabid}, function(response){
                            let $tabid = response;
                            if((idx=createdTabIds.indexOf($tabid)) > -1) {
                                createdTabIds.splice(idx,1);
                                console.log("createdTabIds:",createdTabIds);
                            }
                        });
                    }
                });

                chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
                    if((idx=createdTabIds.indexOf(tabId)) > -1) createdTabIds.splice(idx,1);
                });

                chrome.windows.create({
                    url: keyData.map(v=>v.origin),
                    state: "normal"
                },function(window){
                    window.tabs.map((v)=>{
                        createdTabIds.push(v.id);
                    });
                    console.log("createdTabIds:",createdTabIds);
                });
        });
});







