app.config(function($mdThemingProvider) {
	var background = $mdThemingProvider.extendPalette('grey', {
	  	'A100': 'EEEEEE'
	});
	$mdThemingProvider.definePalette('background', background);
  	$mdThemingProvider.theme('default')
    	.primaryPalette('teal')
    	.accentPalette('purple')
    	.backgroundPalette('background');
});