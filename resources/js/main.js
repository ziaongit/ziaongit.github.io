// Navbar start
window.addEventListener("hashchange", function() { scrollBy(0, -80) })
 $(".nav li").on("click", function() {
      $(".nav li").removeClass("active not-active");
      $(this).addClass("active not-active");
});
$("nav ul li a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(hash).offset().top
			}, 500, function(){

			window.location.hash = hash;
     	});

});
// Navbar end

// Contact form start
var $contactForm = $('#contactForm');
$contactForm.submit(function(e) {
	e.preventDefault();
	$.ajax({
		url: '//formspree.io/zia_gt@yahoo.com',
		method: 'POST',
		data: $(this).serialize(),
		dataType: 'json',
		beforeSend: function() {
			$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
		},
		success: function(data) {
			$contactForm.find('.alert--loading').hide();
			$contactForm.append('<div class="alert alert--success">Message sent!</div>');
		},
		error: function(err) {
			$contactForm.find('.alert--loading').hide();
			$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
		}
	});
});
// Contact form end