/* globals $*/
$(document).ready(function () {
        $.ajax({
            url: 'http://localhost:3000/actors',
            type: "GET",
            dataType: 'json',
            success: function (data) {
                var content = "";
                $.each(data, function (key,value) {
                    $(".demo-list-action").addClass("mdl-list");
                    content += "<div class='mdl-list__item'>";
                    content += "<span class='mdl-list__item-primary-content'>";
                    content += "<i class='material-icons mdl-list__item-avatar'>person</i>";
                    content += "<span>" + value.name + "</span>";
                    content += "</span>";
                    content += "<a class='mdl-list__item-secondary-action' href='#''><i class='material-icons star' value='"+value.name+"' id="+value.id+">";
                    if (value.starred) {
                        content += "star";
                    }
                    else {
                        content += "star_border";
                    }
                    content += "</i></a>";
                    content += "</div>";
                   
                });
                 $(".demo-list-action").html(content);
            }
        });
    });

    $(".addme").click(function () {
       
        var name = $(".actor-name").val();
        $.ajax({
            url: 'http://localhost:3000/actors',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: name,
                starred: false
            }),
            dataType: 'json',
            success: function (data) {
                    var content="";
                    content += "<div class='mdl-list__item'>";
                    content += "<span class='mdl-list__item-primary-content'>";
                    content += "<i class='material-icons mdl-list__item-avatar'>person</i>";
                    content += "<span>" + data.name + "</span>";
                    content += "</span>";
                    content += "<a class='mdl-list__item-secondary-action' href='#'><i class='material-icons star' id="+data.id+" value='"+data.name+"'>";
                    if (data.starred) {
                        content += "star";
                    }
                    else {
                        content += "star_border";
                    }
                    content += "</i></a>";
                    content += "</div>";
                    $(".demo-list-action").append(content);
            }
        });   
        
    });

    $(document).on("click",".material-icons",function(){
        
        var id = $(this).attr('id');
            starred=$(this).html();
            name=$(this).attr('value');
            flag=false;
        if(starred==="star"){
            flag=false;
            $(this).html("star_border");
        }
        else{
            flag=true;
            $(this).html("star");
        }
        $.ajax({
            url: 'http://localhost:3000/actors/' + id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                name:name,
                starred:flag
            }),
            dataType: 'json'
        });
    });

