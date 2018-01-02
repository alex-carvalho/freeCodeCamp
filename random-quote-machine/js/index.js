let url = "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

function nextQuote() {
    $('#quoteText').css('opacity', 0);

    $.getJSON(url, function (data) {
        data.quoteAuthor = data.quoteAuthor ? data.quoteAuthor : 'Unknown';

        let $quoteText = $("#quoteText");
        $quoteText.text(data.quoteText);
        $("#quoteAuthor").text('- ' + data.quoteAuthor);

        $("#twitter").attr("href", `https://twitter.com/intent/tweet?text=${data.quoteText} - ${data.quoteAuthor}`);
        $quoteText.css('opacity', 1);
    }, 'jsonp');
}

$(document).ready(function () {
    nextQuote();
});

$("#newQuote").click(function () {
    nextQuote();
});