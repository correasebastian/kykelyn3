function DeepLinkHandler(data) {
    alert('Initialize: ' + JSON.stringify(data));
    console.log(data);
    if (data.isDeep) {
        var event = new CustomEvent('deepLinking', { 'detail' /*obligatoriamente detail*/ : data });
        document.dispatchEvent(event);
    }

}
