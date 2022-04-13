

document.getElementById('theatre').addEventListener('change', loadTheatre);

function loadTheatre() {
    var theatres = null;
    var theatreId = document.getElementById('theatre').value;
    console.log(theatreId);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200) {
            xmlDoc = xhr.responseXML;
            show = xmlDoc.getElementsByTagName('Show');
            //console.log(show);
            //console.log(show.length);
            //console.log(show[0].childNodes[1].innerHTML);
            //console.log(show[0].children.length);
            //console.log(show[0].children[1].nodeName);
            var tID = null;
            for (var i = 0; i < show.length; i++) {
               for (var a = 0; a < show[i].children.length; a++) {
                   var str = show[i].children[a].nodeName;
                   // console.log(str);
                   if (str.includes('TheatreID')) {
                        tID = show[i].children[a].innerHTML;
                        // console.log(tID);
                        if (theatreId == tID) {
                            console.log(show[i].children[15].innerHTML);
                       }
                   }
               }
            }
        }
         
    }
    
 
    
    //console.log(xmlDoc.getElementsByTagName('TheatreArea')[0].getAttribute('ID'));
}



