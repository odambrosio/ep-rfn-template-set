/* ==========================================================================
   EP Intranet Scripts
   ========================================================================== */
   
/* ==========================================================================
   Tab 
   ========================================================================== */ 
$(function() {
	$('.nav a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})
});
/* ==========================================================================
   Function to create a cookie
   ========================================================================== */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
/* ==========================================================================
   Function to read a cookie
   ========================================================================== */
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
/* ==========================================================================
   Function to erase a cookie
   ========================================================================== */
function eraseCookie(name) {
	createCookie(name,"",-1);
}

/* ==========================================================================
   Nav left collapse/expand + cookies sav status
   ========================================================================== */
$(document).ready( function() {
	var nbOfNav = $( '.nav-left > li' ).length;
	var id = 1;
	
	$( '.nav-left > li > a' ).each( function() {
		var status = "";
		// add ID
		$(this).attr("id","nav-left"+id);
		id=id+1;
		var elementId = $(this).attr('id');
		
		$(this).click(function() {
			if( $(this).parent().hasClass( 'collapsed' ) ) {
				 $(this).parent().removeClass( 'collapsed' );
				 $(this).parent().children('ul').removeClass( 'hidden' );
				 status="";
			}
			else {
				$(this).parent().addClass( 'collapsed' );
				$(this).parent().children('ul').addClass( 'hidden' );
				status="collapsed";
			}
			// Store statut into cookie
			createCookie(elementId, status);
			return false;
		});
		
		// Restore status from cookie
		if( readCookie(elementId) == "collapsed") {
			$(this).parent().addClass( 'collapsed' );
			$(this).parent().children('ul').addClass( 'hidden' );
		}
	});
	
});
/* ==========================================================================
   Sidebar collapse/expand
   ========================================================================== */
$(function() {
	$( '.box-sidebar li.title a' ).click(function() {
			if( $(this).parent().parent().hasClass( 'collapsed' ) ) {
				 $(this).parent().parent().removeClass( 'collapsed' );
			}
			else {
				$(this).parent().parent().addClass( 'collapsed' );
			}
			return false;
		});
});
/* ==========================================================================
   Lightbox popup intialisation, hover effect on thumbnail 
   and add title + description from image
   ========================================================================== */
$(function() {

	$('.popup').hover(function() { 
		$(this).children().stop().animate({"opacity": 0.5});
		$(this).parent().css('background-color','#000');		
	},function() { 
		$(this).children().stop().animate({"opacity": 1});
		$(this).parent().css('background-color','#fff');		
	});
	// Passing in options
	var options = { 
			speed : 200,
			preloaderContent : '<img src="img/preloader.gif" class="preloader">',			
			// add title + description from DOM
			afterOpen : function(){	
				var title = this.ele.firstChild.getAttribute('alt');
				if (title !== null){
					$('<div class="title">'+ title +'</div>').prependTo($('.popup_content'));
				}
				var desc = this.ele.getAttribute('title');
				if (desc !== null){
					$('<div class="description">'+ desc +'</div>').appendTo($('.popup_content'));
				}	
			}	
	};
	$('.popup').popup(options);
});
/* ==========================================================================
   Popup on page load example
   ========================================================================== */
/*   
$(function() {
	var popup = new $.Popup();
	popup.open('<h1>Splash screen autoload !</h1>', 'html');
});
*/
/* ==========================================================================
   Sidebard right toggler
   ========================================================================== */
$(function() {
	$( '.sidebar-toggler' ).click(function() {
			if( $(this).hasClass( 'off' ) ) {
				 showSidebar();
			}
			else {
				hideSidebar();
			}
			return false;
		});
});
function showSidebar() {
	$( '.sidebar-toggler' ).removeClass( 'off' );
	$( '.sidebar-toggler' ).addClass( 'on' );
	//$( '#tools' ).slideDown(800);
	 $('#tools').show(300);
}
function hideSidebar() {

	$( '.sidebar-toggler' ).removeClass( 'on' );
	$( '.sidebar-toggler' ).addClass( 'off' );
	$( '#tools' ).hide(600);
}
// Click extérieur à l'overlayer le ferme
// Fix pour détecter si l'utilisateur scroll la page sur mobile (afin de ne pas prendre cela pour un clic et cacher la colonne)
$(document).ready( function() {
	function nextEvent() {
		//action si l'évenement apres un touchstart et un touchend (clic)
		$(this).bind('touchend', function(e){
			hideColumn();
			$(this).unbind('touchend'); // on enlever l'ecouteur touchend (fonction unbind obselete pour Jquery > 1.7)
		});
	
		//action si l'évenement après un touchstart est un touchmove (scroll)
		$(this).bind('touchmove', function(e){
			$(this).unbind('touchend'); //(on enlever l'ecouteur touchend (fonction unbind obselete pour Jquery > 1.7)
		});
	}
	
	// End function scroll detection
	function hideColumn(event) {
		if ($("#tools").css('position') =='absolute') {
			var thisElement = $(event.target);
			if ((thisElement.parents("#tools").length == 0) && (thisElement.attr('id') != 'tools') ) {
				hideSidebar();
			}
		}
	}
	
	$('body').bind('touchstart', this, nextEvent);
	$('body').bind('click', this, hideColumn);
	
	// détection dans le cas d'un clic dans un iFrame
	var iframeClick = function () {
		var isOverIframe = false,
		windowLostBlur = function () {
			if (isOverIframe === true) {
				// clic sur l'iFrame
				isOverIframe = false;
				hideSidebar();
			}
		};
		$(window).focus();
		//survol de l'iframe
		$('iframe').mouseenter(function(){
			isOverIframe = true;
		});
		// quitte le survol de l'iframe
		$('iframe').mouseleave(function(){
			isOverIframe = false;
		});
		// blur function lorsque l'on pert le focus sur la fenetre
		$(window).blur(function () {
			windowLostBlur();
		});
	};
	iframeClick();
}); 