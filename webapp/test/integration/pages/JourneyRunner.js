sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"zsp/itsm/zspfsolution/test/integration/pages/MainList.gen",
	"zsp/itsm/zspfsolution/test/integration/pages/MainObjectPage.gen"
], function (JourneyRunner, MainListGenerated, MainObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('zsp/itsm/zspfsolution') + '/test/flp.html#app-preview',
        pages: {
			onTheMainListGenerated: MainListGenerated,
			onTheMainObjectPageGenerated: MainObjectPageGenerated
        },
        async: true
    });

    return runner;
});

