$("#scrapeButton").on("click", function() {
    $("#currentArticles").empty();

    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .done(window.location.assign('/'))
})

$(".saveButton").on("click", function() {
    $.post("/api/articles/save", {
        title: $(this).attr("data-title"),
        link: $(this).attr("data-link"),
        summary: $(this).parent().children(1).find("h2").text(),
        comment: ""
    })

    // console.log($(this).parent().children(1).find("h2").text())
})