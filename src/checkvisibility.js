var APP = APP || {};

APP.checkVisibility = (function(window){

	function checkVisibility(elem){

		var self = this;
		var deltas = {};
		var bounds = {};

		var win = window;
		var doc = document.documentElement;
		var docBody = document.body;

		var winHeight;
		var winWidth;
		var rect;
		var elemHeight;
		var elemWidth;
		var docHeight;
		var bounds = {};
		var deltas = {};
		var scrollY;
		var scrollX;
		var rectTop;
		var offsetTop;
		var elemOffsetTop;
		var viewport;
		var trackLength;

		//var docClientTop

		self.elem = elem;

		this.calcSize = function(){

			elemHeight = self.elem.offsetHeight 
			elemWidth = self.elem.offsetWidth;
			elemOffsetTop = self.elem.offsetTop

			docHeight = Math.max(docBody.offsetHeight, doc.scrollHeight);
			winHeight = Math.max(win.innerHeight, doc.clientHeight);
			winWidth = Math.max(win.innerWidth, doc.clientWidth);
			//docClientTop = doc.clientTop;
		}

		this.is = function(elem, y){
			
			scrollY = win.pageYOffset; // IE 10 + purpose
			//scrollX = win.pageXOffset;

			// getBoundingClientRect CAUSES MAJOR REPAINT == fallback needed

			rect = self.elem.getBoundingClientRect();
			 viewport = {
				top : scrollY
			};

			//viewport.right = viewport.left + winWidth;
			viewport.bottom = viewport.top + winHeight;

			bounds = {
				top :  rect.top + scrollY
				//left :  rect.left + scrollX
			}

			//bounds.right = bounds.left + elemWidth;
			bounds.bottom = bounds.top + elemHeight;
	
			if(y !== undefined){
				
				deltas = {
					top : Math.min( 1, ( bounds.bottom - viewport.top ) / elemHeight),
					bottom : Math.min(1, ( viewport.bottom -  bounds.top ) / elemHeight)
				};
			}
		}

		this.percentageScrolled = function(){

			trackLength = docHeight - winHeight;
			
			var pctScrolled = Math.floor(win.scrollY/trackLength * 100);

			return pctScrolled;
		}

		this.inView = function(y){
			
			var y = (y == undefined || y == 0) ? 1 : y;
		
			self.is(self.elem, y)

			// est ce self.y partie de l elem est visible
			return (deltas.top * deltas.bottom) >= y
		}

		this.fromBottom = function(){
			self.is(self.elem)

			// distance du bottom window
			return viewport.bottom - bounds.bottom
		}

		this.fromTop = function(){
			self.is(self.elem)
			// distance du top window
			return viewport.top - bounds.top
		}

		this.viewportTop = function(){
			// scrollY
			self.is(self.elem)

			return viewport.top
		}

		this.viewportBottom = function(){
			// from bottom scroll
			self.is(self.elem)
			return viewport.bottom
		}

		this.bottomOfWindow = function(){
			self.is(self.elem)

			// return si on a scroll toute la window
			return (viewport.top + winHeight) >= (docHeight)
		}

		function _init(){
			self.calcSize();
		}

		_init()
	}

	return checkVisibility

})(window)
