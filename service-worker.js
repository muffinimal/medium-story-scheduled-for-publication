chrome.runtime.onInstalled.addListener((reason) => {
	console.log( "[MediumDistributed] Listener fired! Let's see what's up! reason: ", reason);
	
	switch(reason.reason) {
		case chrome.runtime.OnInstalledReason.UPDATE:
			chrome.tabs.create({
				url: 'https://medium.com/@muffinimal/scheduled-for-publication-chrome-extension-9a6b5d263b98'
			  });
			  console.log( "[MediumDistribution] Updating Medium Distribution info to: ", chrome.runtime.getManifest().version, "from ", reason.previousVersion );
			break;
		case chrome.runtime.OnInstalledReason.INSTALL:
				chrome.tabs.create({
					url: 'https://medium.com/@muffinimal/scheduled-for-publication-chrome-extension-9a6b5d263b98'
				  });
				  console.log( "[MediumDistribution] New install: ", chrome.runtime.getManifest().version );
				break;
		default:
			console.log( "[MediumDistribution] No new update. No new install: ", chrome.runtime.getManifest().version );
			break;
	}
});