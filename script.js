

document.getElementById('theatre').addEventListener('change', loadTheatre);
document.getElementById('sButton').addEventListener('click', searchMovie);

function loadTheatre() {
    var theatres = null;
    var theatreId = document.getElementById('theatre').value;
    //console.log(theatreId);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200) {
            xmlDoc = xhr.responseXML;
            show = xmlDoc.getElementsByTagName('Show');
            var tID = null;
            delete1();
            for (var i = 0; i < show.length; i++) {
               for (var a = 0; a < show[i].children.length; a++) {
                   var str = show[i].children[a].nodeName;
                   // console.log(str);
                   if (str.includes('TheatreID')) {
                        tID = show[i].children[a].innerHTML;
                        // console.log(tID);
                        //console.log(show[i].children[a].children.length);
                        if (theatreId == tID) {
                            // console.log(show[i].children[15].innerHTML);
                            document.getElementById("shows").innerHTML += 
                            "<div id='frame'>"
                                +"<div id='movie'>" 
                                    + moviename(i) 
                                +"</div>"
                                +"<div id='img'>" 
                                    + "<img src='" + image(i) +"' width='100'> </img>"
                                +"</div>"
                                +"<div id='img2'>" 
                                    + "<img src='" + rating(i) +"' width='50' id='img3'> </img>"
                                +"</div>"
                                +"<div id='frameTime'>"
                                    +"<div id='time'>" 
                                        + "Show stars at " + startingTime(i) 
                                    +"</div>"
                                    +"<div id='auditorium'>" 
                                        + "Auditorium: "+ auditorium(i) 
                                    +"</div>"
                                +"</div>"
                                +"<div id='info'>" 
                                        + "<a href='" + linkInfo(i) + "'> More info</a>" 
                                +"</div>"
                            +"</div>";
                       }
                   }
               }
            }
        }
         
    }
    function moviename(i) {
        return show[i].children[15].innerHTML;
    }
    function image(i) {
        var b = null;
        var d = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('Images')) {
                b = a;
                console.log(show[i].children[a].children.length);
                    for (c = 0; c < show[i].children[a].children.length; c++){
                        if (show[i].children[a].children[c].nodeName.includes('EventLargeImagePortrait')) {
                        d = c;
                        }
                    }
                }
            }
        return show[i].children[b].children[d].innerHTML;
    }
    function rating(i) {
        var b = null;
            for (a = 0; a < show[i].children.length; a++) {
                if (show[i].children[a].nodeName.includes('RatingImageUrl')) {
                    b = a;
                }
             }
        return show[i].children[b].innerHTML;
    }
    function startingTime(i) {
        var b = null;
            for (a = 0; a < show[i].children.length; a++) {
                if (show[i].children[a].nodeName.includes('dttmShowStart') && !show[i].children[a].nodeName.includes('UTC')) {
                    b = a;
                }
             }
        var time = show[i].children[b].innerHTML;
        var timex = time.substr(11, 5);  
        return timex;      
    }
    function auditorium(i) {
        var b = null;
            for (a = 0; a < show[i].children.length; a++) {
                if (show[i].children[a].nodeName.includes('TheatreAuditorium')) {
                    b = a;
                }
             }
        return show[i].children[b].innerHTML;        
    }
    function linkInfo(i) {
        var b = null;
            for (a = 0; a < show[i].children.length; a++) {
                if (show[i].children[a].nodeName.includes('EventURL')) {
                    b = a;
                }
             }
        return show[i].children[b].innerHTML;      
    }

}

function searchMovie () {
    //var movieName = document.getElementById('inputf').value;
    //console.log(movieName);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200) {
            xmlDoc = xhr.responseXML;
            show = xmlDoc.getElementsByTagName('Show');
            var asd = null;
            delete1();
            for (var a = 0; a < show.length; a++) {
                for (var b = 0; b < show[a].children.length; b++) {
                    //if (show[a].children[b].nodeName.includes('Title')) {
                    //    movieId = show[a].children[b].innerHTML;
                    //    console.log(show[a].children[b].nodeName)
                    //}
                    var movieN = show[a].children[15].innerHTML;
                    var movieNa = movieN.toUpperCase();
                    if (movieNa.includes(document.getElementById('inputf').value.toUpperCase())) {
                        document.getElementById("shows").innerHTML += 
                            "<div id='frame'>"
                                +"<div id='movie'>" 
                                    + moviename(a) 
                                +"</div>"
                                +"<div id='img'>" 
                                    + "<img src='" + image(a) +"' width='100'> </img>"
                                +"</div>"
                                +"<div id='img2'>" 
                                    + "<img src='" + rating(a) +"' width='50' id='img3'> </img>"
                                +"</div>"
                                +"<div id='frameTime'>"
                                    +"<div id='time'>" 
                                        + "Show stars at " + startingTime(a) 
                                    +"</div>"
                                    +"<div id='auditorium'>" 
                                        + auditorium(a) 
                                    +"</div>"
                                +"</div>"
                                +"<div id='info'>" 
                                        + "<a href='" + linkInfo(a) + "'> More info</a>" 
                                +"</div>"
                            +"</div>";
                    }
                }
            }

        }
}
function moviename(i) {
    return show[i].children[15].innerHTML;
}
function image(i) {
    var b = null;
    var d = null;
    for (a = 0; a < show[i].children.length; a++) {
        if (show[i].children[a].nodeName.includes('Images')) {
            b = a;
            console.log(show[i].children[a].children.length);
                for (c = 0; c < show[i].children[a].children.length; c++){
                    if (show[i].children[a].children[c].nodeName.includes('EventLargeImagePortrait')) {
                    d = c;
                    }
                }
            }
        }
    return show[i].children[b].children[d].innerHTML;
}
function rating(i) {
    var b = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('RatingImageUrl')) {
                b = a;
            }
         }
    return show[i].children[b].innerHTML;
}
function startingTime(i) {
    var b = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('dttmShowStart') && !show[i].children[a].nodeName.includes('UTC')) {
                b = a;
            }
         }
    var time = show[i].children[b].innerHTML;
    var timex = time.substr(11, 5);  
    return timex;      
}
function auditorium(i) {
    var b = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('TheatreAndAuditorium')) {
                b = a;
            }
         }
    return show[i].children[b].innerHTML;        
}
function linkInfo(i) {
    var b = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('EventURL')) {
                b = a;
            }
         }
    return show[i].children[b].innerHTML;      
}


}
function delete1() {
    document.getElementById("shows").innerHTML = " ";
}