# GDPR-Cookies-Manager

Check out the teaser : https://thodorisit.github.io/GDPR-Cookies-Manager/

Requirements and thoughts...

	JQuery is requested.
	Performance will be improved by using minified JS, CSS and JSON files.
	
Documentation: Settings.json

	General object, includes general settings and information.
	Logo : Logo -> left sidebar.
	
	Design object, includes colors used for the elements.
	
		bottomButton      : Right sidebar bottom buttons (Enable All Cookies, Save Changes).
		bottomButtonHover : Right sidebar bottom buttons on hover colors (Enable All Cookies, Save Changes).
		
		leftMenu 		 : Left sidebar list items.
		leftMenuSelected : Left sidebar, selected item.
		
		closeButton 	 : Pop up close button.
		closeButtonHover : Pop up close button on hover colors.
		
		toggleButton : color -> enabled cookies switch
		
		links : color -> links
		
	FloatButton object, includes settings for the fixed-bottom-left button.
		show : 
			1 : enabled
			2 : disabled
		text 			: on hover, text appears next to the button.
		backgroundColor : background color -> button.
		textColor 		: the color of the text -> button.
		
	WarningBox object, includes settings for the cookie consent popup.
		style : available positions
			top,
			top-left,
			top-right,
			bottom,
			bottom-left,
			bottom-right
		settingsText 		: text -> settings button
		acceptText 	 		: text -> accept button
		text 		 		: text -> popup
		acceptBgColor 		: background color -> accept button
		acceptTextColor 	: text color -> accept button
		settingsBgColor 	: background color -> settings button
		settingsTextColor 	: text color -> settings button
		
	BottomButtons object
		enableAllCookies 	: text -> popup bottom right button 
		saveChanges 		: text -> popup bottom right button 
		

	Categories object, includes general information about the categories of the cookies.
	Cookies categories : privacyPreview, necessaryCookies, thirdPartyCookies, additionalCookies, privacyPolicy, performanceCookies, functionalityCookies, advertisingCookies
	
	icon 	: supports fontawesome icons
	title 	: category title
	text 	: information about the cookies category
	actions :
		show_button : 
			1 : enabled -> show toggle switch
			0 : disabled -> hide toggle switch
		button :
			default_state :
				1 : enabled -> active without asking the user
				0 : disabled 
			label : text -> toggle switch
		scripts :
			head, body, footer : array of javascript script links

	Categories_state object, includes information about whether a category is visible.
	Cookies categories :
		1 : enabled -> visible
		0 : disabled -> hidden
		
	Exp : number of days cookies last.
