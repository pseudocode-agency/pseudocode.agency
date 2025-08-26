let first = true;
const CAREERS_PATH = "/careers";
const openPositions = {
    "java-backend": "Java Backend Software Engineer",
    "full-stack": "Full Stack Software Engineer"
}
function hidePanel(accordionBtn) {
    let panel = $(accordionBtn).siblings('.panel')[0];
    $(accordionBtn).removeClass('accordion-active');
    $(panel).removeClass('opened');
    $(panel).find('input#position').val('');
}
function showPanelForPosition(positionShort) {
    let accordionBtn = $("#" + positionShort);
    let panel = $(accordionBtn).siblings('.panel')[0];
    let buttonText = openPositions[positionShort];
    setTimeout(() => {
        $(accordionBtn).addClass('accordion-active');
        $(panel).find('input#position').val(buttonText);
        $(accordionBtn).siblings('.accordion').removeClass('accordion-active');
        $(panel).addClass('opened');
    }, 50);
}
function setURL(url) {
    let positionFull;
    let positionShort = url?.split("/")[2];
    if (url === "/") {
        $('#careers').prop('hidden', true);
        $('.accordion').map((i, ele) => {
            hidePanel(ele);
        }).toArray();
    }
    else if (url === CAREERS_PATH) {
        $('#careers').prop('hidden', false);
    }
    else if (openPositions[positionShort]) {
        positionFull = openPositions[positionShort];
        if (positionShort === window.location.pathname.split("/")[2] && !first) {
            url = CAREERS_PATH;
            setTimeout(() => {
                let accordionBtn = $("#" + positionShort);
                hidePanel(accordionBtn);
            }, 50);
        }
        else{
            showPanelForPosition(positionShort)
        }
    }
    if (!first) {
        try
        {
            history.pushState({
                positionShort: positionShort,
                positionFull: positionFull
            }, '', url);
        }
        catch(e){}       
    }
    first = false;
}
function on_popstate(e) {
    const pathname = window.location.pathname;
    const positionShort = pathname?.split("/")[2];
    if (pathname === "/") {
        $('#careers').prop('hidden', true);
        $('.accordion').map((i, ele) => {
            hidePanel(ele);
        }).toArray();
    }
    else if (pathname === CAREERS_PATH) {
        $('#careers').prop('hidden', false);
        $('.accordion').map((i, ele) => {
            hidePanel(ele);
        }).toArray();
    }
    else if (openPositions[positionShort]) {
        $('#careers').prop('hidden', false);
        showPanelForPosition(positionShort);
    }
}
window.onload = function () {
    setTimeout(function () {
        window.addEventListener("popstate", on_popstate);
    }, 100);
    $("#copyrightYear").text(new Date().getFullYear());
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    const positionShort = pathname?.split("/")[2];
    if (hash === "#careers") {
        $('#careers').prop('hidden', false);
        setURL(CAREERS_PATH);
    }
    else if (hash === "#careers-full-stack") {
        $('#careers').prop('hidden', false);
        showPanelForPosition("full-stack");
        setURL(`${CAREERS_PATH}/full-stack`);
    }
    else if (pathname === "/") {
        setURL(`/`);
    }
    else if (pathname === CAREERS_PATH || pathname === CAREERS_PATH + "/") {
        $('#careers').prop('hidden', false);
        setURL(CAREERS_PATH);
    }
    else if (pathname.startsWith(CAREERS_PATH + "/") && openPositions[positionShort]) {
        $('#careers').prop('hidden', false);
        showPanelForPosition(positionShort);
        setURL(`${CAREERS_PATH}/${positionShort}`);
    }
    else if (positionShort && !openPositions[positionShort]) {
        window.location.href = "/";
    }
}
