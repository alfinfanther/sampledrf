$(function() {

    load_posts()
    function load_posts() {
        $.ajax({
            url : "api/v1/posts/",
            type : "GET",
            success : function(json) {
                console.log(json);
                for (var i = 0; i < json.length; i++) {
                    dateString = convert_to_readable_date(json[i].created_date)
                    $("#talk").prepend("<li id='post-"+json[i].id+"'><strong>"+json[i].name+
                        "</strong> - <em> "+json[i].penulis+"</em> - <span> "+dateString+
                        "</span> - <a id='delete-post-"+json[i].id+"'>delete</a></li>");
                }
            },
            
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); 
                console.log(xhr.status + ": " + xhr.responseText); 
            }
        });
    };

    
    function convert_to_readable_date(date_time_string) {
        var newDate = moment(date_time_string).format('MM/DD/YYYY, h:mm:ss a')
        return newDate
    }

    
    $('#post-form').on('submit', function(event){
        event.preventDefault();
        console.log("form submitted!") 
        create_post();
    });

    
    $("#talk").on('click', 'a[id^=delete-post-]', function(){
        var post_primary_key = $(this).attr('id').split('-')[2];
        console.log(post_primary_key);
        delete_post(post_primary_key);
    });

    
    function create_post() {
        console.log("create post is working!") 
        $.ajax({
            url : "api/v1/posts/", 
            type : "POST", 
            data : { 
                book : $('#book_name').val(),
                penulis : $('#penulis').val()
            }, 
            success : function(json) {
                $('#book_name').val(''); 
                $('#penulis').val(''); 
                console.log(json); 
                dateString = convert_to_readable_date(json.created)
                $("#talk").prepend("<li id='post-"+json.id+"'><strong>"+json.name+"</strong> - <em> "+
                    json.penulis+"</em> - <span> "+dateString+
                    "</span> - <a id='delete-post-"+json.id+"'>delete</a></li>");
                console.log("success");
            },
            
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); 
                console.log(xhr.status + ": " + xhr.responseText); 
            }
        });
    };

    
    function delete_post(post_primary_key){
        if (confirm('are you sure you want to remove this post?')==true){
            $.ajax({
                url : "api/v1/posts/"+post_primary_key, 
                type : "DELETE", 
                data : { postpk : post_primary_key },
                success : function(json) {                    
                  $('#post-'+post_primary_key).hide();
                  console.log("post deletion successful");
                },

                error : function(xhr,errmsg,err) {                    
                    $('#results').html("<div class='alert-box alert radius' data-alert>"+
                    "Oops! We have encountered an error. <a href='#' class='close'>&times;</a></div>"); 
                    console.log(xhr.status + ": " + xhr.responseText); 
                }
            });
        } else {
            return false;
        }
    };

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        var host = document.location.host; 
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});