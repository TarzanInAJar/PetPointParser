chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher ({
                pageUrl: {hostSuffix: 'petpoint.com', pathSuffix: '.xml'},
                pageUrl: {schemes: ['file'], pathSuffix: '.xml'}
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }])
    })
})


