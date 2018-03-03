var randomQuote;
var currentIndex;
var quoteText;
var quoteAuthor;
$(document).ready(function() { 
    getRandomQuote();
    $('#randomQuote').click(getRandomQuote);
    $('#twitter').click(shareTweet);
    
    function getRandomQuote(){
        // user can you this api https://talaikis.com/api/quotes/
        $.getJSON("resources/js/api.js", function(data) {
        generateQuote(data);
        });
    }

    function generateQuote(quotes) {
        do {
            var QuotesIndex = Math.floor(Math.random() * quotes.length);
        }while(currentIndex === QuotesIndex)
        
        randomQuote = quotes[QuotesIndex];
        quoteText = randomQuote.quote;
        quoteAuthor = randomQuote.author;
        currentIndex = QuotesIndex;
        
        $('#quote').html(randomQuote.quote);
        $('#author').html('- '+randomQuote.author);

        
    }
    function shareTweet() {
        if(quoteText.length > 100) {
            quoteText = quoteText.substr(0, 100).match(/(^.+)\s/)[1]+ '...';
        }
        window.open('https://twitter.com/intent/tweet?text='+quoteText+' - '+quoteAuthor);
    }
  
});


