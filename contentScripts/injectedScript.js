let clicklimit = 1;

chrome.runtime.onMessage.addListener(function(messages,sender,sendResponse) {
    messages.keyData.map((message)=>{
        let ll = window.document.location;
        if(ll.origin + ll.pathname + ll.search === message.origin && clicklimit>0) {
                clicklimit--;
                sendResponse(messages.tabid);

                let fillValue = (domel, val)=>{
                    //simulateKeystroke(domel, val);
                    domel.setAttribute('value', val);
                    domel.value = val;
                };

                fillValue( selectorParser(`${message.selectors.id}`), message.id);
                fillValue( selectorParser(`${message.selectors.pwd}`), message.pwd);
                selectorParser(`${message.selectors.click}`).click();
        }
    });
});

function selectorParser(selectorString){ //return string-specified dom-element;
    let windows = selectorString.split(">>>");
    let resultDom;
    try{
        switch(windows.length){
            case 1:
                resultDom = document.querySelectorAll(windows[0])[0];
                break;
            case 2:
                resultDom = document.querySelectorAll(windows[0])[0].contentWindow.document.querySelectorAll(windows[1])[0];
                break;
        }
    }catch(err){
        console.error(err);
    }
    return resultDom;
}

function simulateKeystroke(element, str){
        [].slice.call(str).map((v,i)=>{
            keystroke(v);
        });

        function keystroke(c){
            let uniInt = c.charCodeAt(0);
            let event = new KeyboardEvent('keypress', {'keyCode':uniInt, 'which':uniInt});
            element.dispatchEvent(event);
        }
}
