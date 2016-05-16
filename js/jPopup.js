(function($){
	var $bubble;

	$.fn.popup = function (options) {
		var options=$.extend({},options);
		var $this=$(this),
			$current,
			$prevParent,
			$imageLinks = $this.filter('[href*=jpg]');

		var bFog=$("<div class='bubble-fog'>");
		var bBox=$("<div class='bubble-box'>");
		var bNext=$("<a>",
			{
				"class": "bubble-next"
				,"href":"#"
				,on: {
					click: browseItems
				}});
		var bPrev=$("<a>",
			{
				"class": "bubble-prev"
				,"href":"#"
				,on: {
					click: browseItems
				}});

		function Init(){
			bFog.append([bBox, bNext, bPrev]).appendTo($("body"));
		};
		$("body").on("click",$this.selector,function(e){
			$current=$(this);
			e.preventDefault();
			e.stopPropagation();
			if (this.hash) {
				showPopup(this);
			} else {
				showPopupImg(this);
			};
		});

		bFog.click(function(e){
			if ((e.target === bFog[0]) || (e.target === bBox[0])) {hidePopup();}
		});

		function showPopupImg(target) {

			bFog.show(function(){
				$(this).css("display","flex");
				bBox.append('<img src="'+target.href+'">').show();

				if ($imageLinks.length > 1) {
					checkOuterMost($imageLinks.index($current));
				};
			});
		};
		function showPopup(target) {
			bFog.show(function(){
				$prevParent=$(target.hash).parent();
				$(this).css("display","flex");
				bBox.append($(target.hash)).show();
			});
		};
		function hidePopup () {
			if ($prevParent) {$prevParent.append($($current[0].hash))};
			bBox.empty().hide(function(){
				bFog.hide();
				bNext.add(bPrev).removeClass('active');
			});
		};
		function browseItems(e) {
			e.preventDefault();

			var $curIndex = $imageLinks.index($current);
			
			if (this === bNext[0]) {
				$current=($imageLinks.length == ($curIndex + 1)) ? $current : $imageLinks.eq($imageLinks.index($current) + 1);
			} else {
				$current=($curIndex == 0) ? $current : $imageLinks.eq($imageLinks.index($current) - 1);
			};

			bBox.empty().append('<img src="'+$current.attr("href")+'">');

			checkOuterMost($imageLinks.index($current));
		};

		function checkOuterMost ($index) {
			console.log($index);

			if ($imageLinks.length > ($index + 1) ) {bNext.addClass('active')} else {bNext.removeClass('active')};
			
			if ($index < 1) {bPrev.removeClass('active')} else {bPrev.addClass('active')};

		}

		Init();

		return this;
	}
})(jQuery);

jQuery(function($){
	$("a[href*=jpg], .a-popup").popup();
});