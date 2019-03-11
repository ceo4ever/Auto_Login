let DB_KeyData = [
    //{id:'', pwd:'', origin:"http://192.168.124.205:8080/login", selectors:{id:"input[name=username]", pwd:"input[name=password]", click:"div.ui.fluid.large.primary.submit.button"}},
    {id:'', pwd:'', origin:"https://signinssl.gmarket.co.kr/LogIn/LogIn", selectors:{id:"#id", pwd:"#pwd", click:".btn-login>a>input"}},
    {id:'', pwd:'', origin:"https://login.11st.co.kr/login/Login.tmall", selectors:{id:"#loginName", pwd:"#passWord", click:".save_idW>input[type=button]"}},
    {id:'', pwd:'', origin:"https://memberssl.auction.co.kr/Authenticate/", selectors:{id:"#id", pwd:"#password", click:".login-btn>#Image1"}},
    {id:'', pwd:'', origin:"https://signin.ebay.com/ws/eBayISAPI.dll", selectors:{id:"#userid", pwd:"#pass", click:"#sgnBt"}},
    {id:'', pwd:'', origin:"https://www.amazon.com/ap/signin?_encoding=UTF8&ignoreAuthState=1&openid.assoc_handle=usflex"+
                "&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity"+
                "=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns="+
                "http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0", selectors:{id:"#ap_email", pwd:"#ap_password", click:"#signInSubmit"}},
    {id:'', pwd:'', origin:"https://login.coupang.com/login/login.pang", selectors:{id:"#login-email-input", pwd:"#login-password-input", click:"._loginSubmitButton"}},
    {id:'', pwd:'', origin:"https://www.interpark.com/member/login.do?_method=initial", selectors:{id:"iframe[name=subIframe]>>>#memId", pwd:"iframe[name=subIframe]>>>#pwd", click:"iframe[name=subIframe]>>>.btnRed[type=button]"}},
    {id:'', pwd:'', origin:"https://front.wemakeprice.com/user/login", selectors:{id:"#_loginId", pwd:"#_loginPw", click:"#_userLogin"}},
    {id:'', pwd:'', origin:"https://login.taobao.com/member/login.jhtml", selectors:{id:"#TPL_username_1", pwd:"#TPL_password_1", click:"#J_SubmitStatic"}},
    {id:'', pwd:'', origin:"https://login.ticketmonster.co.kr/user/loginform", selectors:{id:"#userid", pwd:"#pwd", click:".btn_login"}},
   //{id:'', pwd:'', origin:"https://nid.naver.com/nidlogin.login", selectors:{id:"#id", pwd:"#pw", click:".btn_global"}},
];

function createForm(aData) {
        let template = `<div id="optionsForm" class="ui segment formHidden" style=" margin:0px;padding:0px;background-color:transparent;border:0px;box-shadow:none;">
                    <div class="field">
                        <label>The Site Address</label>
                        <input type="text" name="siteaddress" placeholder="ex: https://login.11st.co.kr" value="${aData.origin||''}">
                    </div>
                    <div class="field">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="ex: admin" value="${aData.id||''}">
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="ex: 123456" value="${aData.pwd||''}">
                    </div>
                    <div class="ui segment " style="">
                        <div class="field">
                            <label>Selector Of Username</label>
                            <input type="text" name="SelectorOfUsername" placeholder="ex: #loginName" value="${(aData.selectors && aData.selectors.id) || ''}">
                        </div>

                        <div class="field">
                            <label>Selector Of Password</label>
                            <input type="text" name="SelectorOfPassword" placeholder="ex: #passWord" value="${(aData.selectors && aData.selectors.pwd) || ''}">
                        </div>
                        <div class="field">
                            <label>Selector Of LoginButton</label>
                            <input type="text" name="SelectorOfButton" placeholder="ex: .save_idW>input[type=button]" value="${(aData.selectors && aData.selectors.click) || ''}">
                        </div>
                    </div>
                </div>`;
        return template;
}

function createLink(linkNo){
    return `<a href="#">${ linkNo+1<10 ? "0"+(linkNo+1) : linkNo+1 }</a>`;
}

function addForm(form){
    document.querySelector("#keydata").innerHTML += form;
}
function addLink(link){
    document.querySelector("#navigation").innerHTML += link;
}

function keyDataRepresentation(keyData){
    keyData.map((v,i)=>{
        addForm(createForm(v));
        addLink(createLink(i));
    });
}

function hideAllForm(formArr){
    let isActive = document.querySelector(".formActived");
        if(isActive){
            isActive.classList.remove('formActived');
            isActive.classList.add('formHidden');
        }
}

function blurAllLink(linkArr){
    let isFocused = document.querySelector(".linkFocused");
    if(isFocused){
        isFocused.classList.remove('linkFocused');
        isFocused.classList.add('linkBlurred');
    }
}


function linkClickEventHandle(isInit=true){
    let formArr = [].slice.call(document.querySelectorAll("#keydata>#optionsForm"));
    let linkArr = [].slice.call(document.querySelectorAll("#navigation>a"));
    let clickedLinkIndex = (clickEvent) => parseInt(e.toElement.innerText)-1;

    linkArr.map((v,i)=>{
            v.addEventListener('click',(e)=>{
                e.preventDefault();
                hideAllForm(formArr);
                blurAllLink(linkArr);

                formArr[i].classList.add('formActived');
                formArr[i].classList.remove('formHidden');

                linkArr[i].classList.add('linkFocused');
                linkArr[i].classList.remove('linkBlurred');
            });
    });

    isInit && linkArr[0].click();
    return {formArr,linkArr};
}

function getAllFormsValue(){
    let options = document.querySelectorAll("#optionsForm");
    let newKeyData = [];
    for(let i=0; i<options.length; i++){
        let akeyData = {
             origin: options[i].querySelector("input[name=siteaddress]").value,
             id: options[i].querySelector("input[name=username]").value,
             pwd: options[i].querySelector("input[name=password]").value,
                   selectors:{
                        id: options[i].querySelector("input[name=SelectorOfUsername]").value,
                        pwd: options[i].querySelector("input[name=SelectorOfPassword").value,
                        click: options[i].querySelector("input[name=SelectorOfButton]").value
                   }
        }
        newKeyData.push(akeyData);
    }
    return newKeyData;
}
function fillInActiveForm(akeyData){
    let formActived = document.querySelector(".formActived");
        let $$ = (sel)=>{return formActived.querySelector(sel)};
        let fillValue = (domel,val)=>{ domel.setAttribute('value',val); domel.value = val; };

        fillValue($$("input[name=siteaddress]"), akeyData.origin);
        fillValue($$("input[name=username]"), akeyData.id);
        fillValue($$("input[name=password]"), akeyData.pwd);

        fillValue($$("input[name=SelectorOfUsername]"), akeyData.selectors.id);
        fillValue($$("input[name=SelectorOfPassword"), akeyData.selectors.pwd);
        fillValue($$("input[name=SelectorOfButton]"), akeyData.selectors.click);
}

function addOptToDropdownlist(keyData){
    let createOption = (akeyData,index)=>{
        let opt = document.createElement("option");
            opt.setAttribute('value',index);
            opt.innerText = akeyData.origin.split("/").slice(0,3).join("/").split(".")[1].toUpperCase();
            return opt;
    }
    let addOption = (option)=>{
        document.querySelector("#dropdownList").appendChild(option);
    }
    keyData.map((v,i)=>{ addOption(createOption(v,i)); });
}

function dropdownlistSelecteventHandle(keyData){
    document.querySelector("#dropdownList").addEventListener("change",(e)=>{
        fillInActiveForm(keyData[e.target.value]);
    });
}

function initiateDropdownlist(DB_KeyData){
    addOptToDropdownlist(DB_KeyData);
    dropdownlistSelecteventHandle(DB_KeyData);
}

function insertNewform(){
    addForm(createForm({}));
    addLink(createLink(document.querySelectorAll("#navigation>a").length));
    linkClickEventHandle(false);
    document.querySelector("#navigation>a:last-child").click();
    document.querySelector("#navigation").scrollTo({left:10000,behavior:'smooth'});
}

function removeNewform(){
    let curIndex = window.parseInt(document.querySelector(".linkFocused").innerText)-1;
    document.querySelector(".formActived").remove();
    document.querySelector(".linkFocused").remove();

    let linkCount = document.querySelectorAll("#navigation>a").length;
    linkCount>0 && document.querySelectorAll("#navigation>a")[curIndex > linkCount-1 ? linkCount-1 : curIndex].click();
}

function isEmpty(obj){
    return Object.keys(obj).length === 0;
}


(()=>{
        document.querySelector("#save").addEventListener("click",(e)=>{
            e.preventDefault();
            keyData = getAllFormsValue();
            chrome.storage.local.set({keyData},function(){
                alert('Saved Successfully.');
                console.log(keyData);
            });
        });

            document.querySelector("#add").addEventListener("click",(e)=>{
                insertNewform();
            });

                document.querySelector("#remove").addEventListener("click",(e)=>{
                    e.preventDefault();
                    removeNewform();
                });

                    chrome.storage.local.get(['keyData'], function(result){
                        let createView = ()=>{
                            initiateDropdownlist(DB_KeyData);
                            keyDataRepresentation( isEmpty(result.keyData) ? keyData : result.keyData );
                            linkClickEventHandle(true);
                        }
                        createView();
                    });

                        $('.ui.dropdown').dropdown();
})();



