var cgdpr = '', flagf = 0, flags = 0;
$.getJSON('js/settings.json', function(jsonData) {
    createCookie("expiration", jsonData.exp, "360");
    
    cgdpr += '<div id="gdpr-cookies-container" class="gdpr-cookies-shadow gdpr-cookies-radius hidden">';
    cgdpr +=    '<input type="hidden" class="gdpr-cookies-hidden-box"/>';
    cgdpr +=    '<div onClick="closeGdprPopUp()" id="gdpr-cookies-close-container" class="gdpr-cookies-radius">&#10005;</div>';
    cgdpr +=    '<ul>';
    cgdpr +=        '<li>';
    cgdpr +=            '<div style="position:absolute; width:40%; height:100%; background:#FFFFFF; z-index:29990;">';
    cgdpr +=                '<div id="gdpr-cookies-left-logo" class="gdpr-cookies-shadow"></div>';
    cgdpr +=                '<div id="gdpr-cookies-left-menu">';
    
    $.each(jsonData.categories[0], function(key,value) {
        flagf++;
        if (flagf == 1) {
            cgdpr += '<div class="gdpr-cookies-left-menu-item gdpr-cookies-left-menu-item-selected '+key+'-left-menu" onClick="showRightBox(\''+key+'\')">';
        } else {
            cgdpr += '<div class="gdpr-cookies-left-menu-item '+key+'-left-menu" onClick="showRightBox(\''+key+'\')">';
        }
        if (value.icon !== null && value.icon !== "") {
            cgdpr += '<i class="fa fa-'+value.icon+'" style="font-size:25px; margin-right:10px;"></i>';
        }
        cgdpr += value.title +'</div>';
    });
   
    cgdpr +=                '</div>';
    cgdpr +=            '</div>';
    cgdpr +=        '</li>';
    
    $.each(jsonData.categories[0], function(key,value) {
        flags++;
        if (jsonData.categories_state[key] == 1) {
            if(flags == 1) {
                cgdpr +=        '<li class="'+key+'-right-box gdpr-cookies-right-box-selected">';
            } else {
                cgdpr +=        '<li class="'+key+'-right-box gdpr-cookies-right-box-hidden">';
            }
            cgdpr +=            '<div style="position:absolute; width:60%; height:100%; background:#EDEDED; z-index:29990; margin-left:40%;" class="gdpr-cookies-shadow-inner">';
            cgdpr +=                '<div id="gdpr-cookies-right-title">';
            cgdpr +=                    value.title;
            cgdpr +=                '</div>';
            cgdpr +=                '<div id="gdpr-cookies-right-content">';
            cgdpr +=                    value.text;

                if (jsonData.categories[0][key].actions.show_button == '1') {
                    
                    if (readCookie(key) !== null) {
                        if (readCookie(key) == '0') {
                            cgdpr += '<br/> <div class="gdpr-cookies-slider-label">'+value.actions.button.label+'</div> <label class="gdpr-cookies-toggle-button-'+key+' gdpr-cookies-switch"><input type="checkbox" class="gdpr-cookies-checkbox-'+key+'" onClick="toggleButtonSubmit(\''+key+'\')""><span class="gdpr-cookies-slider"></span></label>';
                        } else {
                            cgdpr += '<br/> <div class="gdpr-cookies-slider-label">'+value.actions.button.label+'</div> <label class="gdpr-cookies-toggle-button-'+key+' gdpr-cookies-switch"><input type="checkbox" class="gdpr-cookies-checkbox-'+key+'" checked onClick="toggleButtonSubmit(\''+key+'\')" ><span class="gdpr-cookies-slider"></span></label>';
                            
                            //Add scripts
                            for (var i=0; i<value.actions.scripts.head.length; i++) {
                                $('head').append('<script type="text/javascript" src="'+value.actions.scripts.head[i]+'"></script>');
                            }
                            
                            for (var i=0; i<value.actions.scripts.body.length; i++) {
                                $('body').append('<script type="text/javascript" src="'+value.actions.scripts.body[i]+'"></script>');
                            }
                            
                            for (var i=0; i<value.actions.scripts.footer.length; i++) {
                                $('footer').append('<script type="text/javascript" src="'+value.actions.scripts.footer[i]+'"></script>');
                            }
                            
                            
                        }
                    } else {
                        if (value.actions.button.default_state == '0') {
                            cgdpr += '<br/> <div class="gdpr-cookies-slider-label">'+value.actions.button.label+'</div> <label class="gdpr-cookies-toggle-button-'+key+' gdpr-cookies-switch"><input type="checkbox" class="gdpr-cookies-checkbox-'+key+'" onClick="toggleButtonSubmit(\''+key+'\')""><span class="gdpr-cookies-slider"></span></label>';
                        } else {
                            cgdpr += '<br/> <div class="gdpr-cookies-slider-label">'+value.actions.button.label+'</div> <label class="gdpr-cookies-toggle-button-'+key+' gdpr-cookies-switch"><input type="checkbox" class="gdpr-cookies-checkbox-'+key+'" checked onClick="toggleButtonSubmit(\''+key+'\')" ><span class="gdpr-cookies-slider"></span></label>';
                            
                            //Add scripts
                            for (var i=0; i<value.actions.scripts.head.length; i++) {
                                $('head').append('<script type="text/javascript" src="'+value.actions.scripts.head[i]+'"></script>');
                            }
                            
                            for (var i=0; i<value.actions.scripts.body.length; i++) {
                                $('body').append('<script type="text/javascript" src="'+value.actions.scripts.body[i]+'"></script>');
                            }
                            
                            for (var i=0; i<value.actions.scripts.footer.length; i++) {
                                $('footer').append('<script type="text/javascript" src="'+value.actions.scripts.footer[i]+'"></script>');
                            }
                    
                        }
                    }
                }

            cgdpr +=                '</div>';
            cgdpr +=                '<div id="gdpr-cookies-right-footer">';
            cgdpr +=                    '<div onClick="enableAllCookies()" class="gdpr-cookies-right-footer-button left"> <i class="fa fa-check-circle"></i> '+jsonData.general.bottomButtons.enableAllCookies+'</div>';
            cgdpr +=                    '<div onClick="saveChangesCategory(\''+key+'\')" class="gdpr-cookies-save-changes-'+key+' gdpr-cookies-right-footer-button right disabled"> <i class="fa fa-save"></i> '+jsonData.general.bottomButtons.saveChanges+'</div>';
            cgdpr +=                '</div>';
            cgdpr +=            '</div>';
            cgdpr +=        '</li>';
        }
    });
    
    cgdpr +=    '</ul>';
    cgdpr += '</div>';
    cgdpr += '<div onClick="closeGdprPopUp()" id="gdpr-cookies-overlaybg" class="hidden"></div>';
    
    $('body').append(cgdpr);
    
    if (jsonData.general.floatButton.show == '1') {
        var gdprSettingsButton = '<div onClick="openGdprPopUp()" class="gdpr-cookies-floatButton"><i class="fa fa-tasks gdpr-cookies-floatButton-icon"></i><font class="gdpr-cookies-floatButton-text" data-floatButton="'+jsonData.general.floatButton.text+'"></font></div>';
        $('body').append(gdprSettingsButton);
    }
    
    if (readCookie("pageVisited") == null) {
        var warningStyles = ["top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right"];
        if (warningStyles.indexOf(jsonData.general.warningBox.style) >= 0) {
            var warningBox = '<div class="gdpr-cookies-warning-float-box '+jsonData.general.warningBox.style+'">';
            warningBox += '<div class="" style="display:inline-block; position:relative; margin-bottom: 10px;">'+jsonData.general.warningBox.text+'</div>';
            warningBox += '<div onClick="openGdprPopUp()" class="gdpr-cookies-warning-button gdpr-cookies-warning-settings">'+jsonData.general.warningBox.settingsText+'</div>';
            warningBox += '<div onClick="enableAllCookies()" class="gdpr-cookies-warning-button gdpr-cookies-warning-accept">'+jsonData.general.warningBox.acceptText+'</div></div>';
            $('body').append(warningBox);
        }
    }
    
    /** PopUp CSS classes **/
    var pus = document.createElement('style');
    pus.type = 'text/css';
    pus.innerHTML = '.gdpr-cookies-right-footer-button { background: '+ jsonData.general.design.bottomButton.backgroundColor +'; color: '+ jsonData.general.design.bottomButton.textColor +'; border-color: '+ jsonData.general.design.bottomButton.backgroundColor +'; } ';
    pus.innerHTML += '.gdpr-cookies-right-footer-button:hover { color: '+ jsonData.general.design.bottomButtonHover.textColor +'; border-color: '+ jsonData.general.design.bottomButtonHover.backgroundColor +'; } ';
    pus.innerHTML += '.gdpr-cookies-left-menu-item { color: '+ jsonData.general.design.leftMenu.textColor +'; background: '+ jsonData.general.design.leftMenu.backgroundColor +';} ';
    pus.innerHTML += '.gdpr-cookies-left-menu-item-selected { border-right:2px solid '+ jsonData.general.design.leftMenuSelected.rightBorderColor +'; color: '+ jsonData.general.design.leftMenuSelected.textColor +'; background: '+ jsonData.general.design.leftMenuSelected.backgroundColor +';} ';
    pus.innerHTML += '#gdpr-cookies-close-container { background: '+ jsonData.general.design.closeButton.backgroundColor +'; color: '+ jsonData.general.design.closeButton.charColor +';}';
    pus.innerHTML += '#gdpr-cookies-close-container:hover { background: '+ jsonData.general.design.closeButtonHover.backgroundColor +'; color: '+ jsonData.general.design.closeButtonHover.charColor +';}';
    pus.innerHTML += '.gdpr-cookies-switch input:checked + .gdpr-cookies-slider { background-color: '+ jsonData.general.design.toggleButton.enabledColor +';}';
    pus.innerHTML += '.gdpr-cookies-switch input:focus + .gdpr-cookies-slider { background-color: '+ jsonData.general.design.toggleButton.enabledColor +';}';
    document.getElementsByTagName('head')[0].appendChild(pus);
    
    /** Floating Button CSS class **/
    var fbs = document.createElement('style');
    fbs.type = 'text/css';
    fbs.innerHTML = '.gdpr-cookies-floatButton-icon { background: ' + jsonData.general.floatButton.backgroundColor +'; color: ' + jsonData.general.floatButton.textColor +';} ';
    document.getElementsByTagName('head')[0].appendChild(fbs);
    
    /** Warning CSS classes **/
    var ws = document.createElement('style');
    ws.type = 'text/css';
    ws.innerHTML = '.gdpr-cookies-warning-settings { background: ' + jsonData.general.warningBox.settingsBgColor +'; color: ' + jsonData.general.warningBox.settingsTextColor +';} ';
    ws.innerHTML += '.gdpr-cookies-warning-accept { background: ' + jsonData.general.warningBox.acceptBgColor +'; color: ' + jsonData.general.warningBox.acceptTextColor +';} ';
    document.getElementsByTagName('head')[0].appendChild(ws);
    
    /** Link CSS class **/
    var ls = document.createElement('style');
    ls.type = 'text/css';
    ls.innerHTML = 'a { color: ' + jsonData.general.design.links.color +';} ';
    document.getElementsByTagName('head')[0].appendChild(ls);
    
    /** Logo CSS class **/
    var lgs = document.createElement('style');
    lgs.type = 'text/css';
    lgs.innerHTML = '#gdpr-cookies-left-logo { background: url(\'' + jsonData.general.logo + '\') center center no-repeat; background-size:40%;} ';
    document.getElementsByTagName('head')[0].appendChild(lgs);
    
});

function showRightBox(slag) {
    $('.gdpr-cookies-left-menu-item-selected').removeClass("gdpr-cookies-left-menu-item-selected");
    $('.'+slag+'-left-menu').addClass("gdpr-cookies-left-menu-item-selected");
    $('.gdpr-cookies-right-box-selected').addClass("gdpr-cookies-right-box-hidden"); 
    $('.'+slag+'-right-box').removeClass("gdpr-cookies-right-box-hidden");
    $('.gdpr-cookies-right-box-selected').removeClass("gdpr-cookies-right-box-selected");
    $('.'+slag+'-right-box').addClass("gdpr-cookies-right-box-selected");
}

function toggleButtonSubmit(slag) {
    $('.gdpr-cookies-save-changes-'+slag).removeClass("disabled");
}

function saveChangesCategory(slag) {
    
    if ($('.gdpr-cookies-save-changes-'+slag).hasClass("disabled")) {
        //console.log("Error");
    } else {
        $('.gdpr-cookies-save-changes-'+slag).addClass("disabled");
        if ($('.gdpr-cookies-checkbox-'+slag).is(':checked')) {
            createCookie(slag, "1", readCookie("expiration"));
        } else {
            createCookie(slag, "0", readCookie("expiration"));
        }
        
        createCookie("pageVisited", "1", "360");
        
        location.reload();
    }
}

function enableAllCookies() {
    createCookie("privacyPreview", "1", readCookie("expiration"));
    createCookie("necessaryCookies", "1", readCookie("expiration"));
    createCookie("thirdPartyCookies", "1", readCookie("expiration"));
    createCookie("additionalCookies", "1", readCookie("expiration"));
    createCookie("privacyPolicy", "1", readCookie("expiration"));
    createCookie("performanceCookies", "1", readCookie("expiration"));
    createCookie("functionalityCookies", "1", readCookie("expiration"));
    createCookie("advertisingCookies", "1", readCookie("expiration"));
    
    createCookie("pageVisited", "1", "360");
    
    location.reload();
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function openGdprPopUp() {
    $('#gdpr-cookies-overlaybg').removeClass("hidden");
    $('#gdpr-cookies-container').removeClass("hidden");
}

function closeGdprPopUp() {
    $('#gdpr-cookies-overlaybg').addClass("hidden");
    $('#gdpr-cookies-container').addClass("hidden");
}