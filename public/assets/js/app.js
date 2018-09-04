let articleId

$("#scrapeButton").on("click", function() {
    $("#currentArticles").empty();

    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .done(window.location.assign('/scraped'))
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
    articleId = $(this).attr("data-id")
    $.get(`/api/articles/comments/${$(this).attr("data-id")}`, function(data) {
        $("#modalTitle").text(`Notes for ${data[0].title}`);
        if (data[0].comment.length > 0) {
            $("#modalNote").text(data[0].comment);
        }
        else {
                $("#modalNote").text("None")
            }
        $(".modal").toggleClass("is-active");
    })
});

$(".deleteButton").on("click", function() {
    $.ajax({
        method: "DELETE",
        url: `/api/articles/${$(this).attr("data-id")}`
    })
    .done(window.location.assign('/articles'))
});

$(".closeModal").on("click", function() {
    $(".modal").toggleClass("is-active");
});

$("#saveComment").on("click", function() {
    let enterComment = $("#modalEntry").val();
    $.ajax({
        method: "PUT",
        url: `/api/articles/comments/${articleId}`,
        data: {comment: enterComment}
    })
    $("#modalEntry").val("");
    $(".modal").toggleClass("is-active");
});

$("#deleteComment").on("click",function() {
    $.ajax({
        method: "PUT",
        url: `/api/articles/comments/${articleId}`,
        data: {comment: ""}
    })
    $("#modalEntry").val("");
    $(".modal").toggleClass("is-active");
});