$('#contactForm').submit(function(e){
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    if(!name.value || !email.value || !message.value) {
        alertify.error('Please check your entries');
    }else {

        $.ajax({
            url: "https://formspree.io/zia_gt@yahoo.com", 
            method: "POST",
            data: $(this).serialize(),
            dataType: "json"
        });
            e.preventDefault();
            $(this).get(0).reset();
            alertify.success('Message sent!')
    }

});