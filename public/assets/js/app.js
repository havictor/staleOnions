$("#scrapeButton").on("click", function() {
    $("#currentArticles").empty();

    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .done(window.location.assign('/'))
});

$(".saveButton").on("click", function() {
    $.post("/api/articles/save", {
        title: $(this).parent().children(1).find("h1").text(),
        link: $(this).attr("data-link"),
        summary: $(this).parent().children(1).find("h2").text(),
        comment: ""
    })
});

$(".commentButton").on("click", function() {
    $.get(`/api/articles/${$(this).attr("data-id")}`, function(data) {
        $("#modalTitle").text(`Notes for ${data[0].title}`);
        if (data[0].comment.length > 0) {
            $("#modalNote").text(data[0].comment);
        }
        else
            $("#modalNote").text("None");
        $(".modal").toggleClass("is-active");
    })
});

$(".deleteButton").on("click", function() {
    
});

$(".closeModal").on("click", function() {
    $(".modal").toggleClass("is-active");
});

$("#saveComment").on("click", function() {

})