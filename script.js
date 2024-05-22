
window.onscroll = function(ev) {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
      loadMore();
    }
};
function elapsed(past) {
  var elapsed = Date.now()/1000 - past;
  console.log(elapsed);
  var weeks = Math.floor(elapsed/604800);
  if (weeks > 0) {
    return weeks + " weeks ago"
  }
  var days = Math.floor(elapsed/86400);
  if (days > 0) {
    return days + " days ago"
  }
  var hours = Math.floor(elapsed/3600);
  if (hours > 0) {
    return hours + " hours ago"
  }
  var minutes = Math.floor(elapsed/60);
  if (minutes > 0) {
    return minutes + " minutes ago"
  }
  
  return elapsed + " seconds ago"
  
  
}
let last = null;
function formatTime(val) {
  const da = new Date(val*1000);
  return da.toLocaleDateString('en-us') + " " + da.toLocaleTimeString('en-US')

}
async function loadMore() {
  $("#load").show();
  console.log("Loading more...")
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  var url = "";
  if (last != null) {
    url+="https://miniapiproxy.jellyfish69420.repl.co/get?after="+last;
  } else {
    url+="https://miniapiproxy.jellyfish69420.repl.co/get?after=no";

  }
  console.log(url)
  const response = await fetch(url)
  const json = await response.json();
  for (var item of json.data.children) {
    const itData = item.data;
    if (itData.link_flair_text=="Cat Picture") {
      //Cat Picture :)
      let image = ""
      if (itData.preview == undefined) {
        continue
      }
      for (var item of itData.preview.images) {
        image+=("<img width=300 src=\"" + item.source.url + "\" />")
      }
      last = itData.name
      
      const d = `
      <div class="item">
        <div class="heading">
          <div class="voteDat">
            <div>
              <span class="material-symbols-outlined">
                arrow_upward
              </span>
            </div>
            <p>${itData.score}</p>
            <div class="down">
              <span class="material-symbols-outlined">
                arrow_downward
              </span>
            </div>

          </div>
          <div class="headText">
            <h2>${itData.title}</h2>
            <p>${itData.selftext}</p>
            <div class="media">
            ${image}
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="infoItem">
            <span class="material-symbols-outlined">
              timer
            </span>
            <p class="timestamp" initVal =${itData.created} title="${formatTime(itData.created)}">${elapsed(itData.created)}</p>

          </div>
          <div class="infoItem">

            <span class="material-symbols-outlined">
              comment
            </span>
            <p>${itData.num_comments}</p>
          </div>
          <div class="infoItem">

            <span class="material-symbols-outlined">
              person
            </span>
            <p style="width:100px;white-space: normal;line-break:anywhere">${itData.author}</p>
          </div>
        </div>
      </div>
      `
      $("#results").append(d)
    }
  }
  $("#load").hide()
}
setInterval(function() {
  $('.timestamp').each(function(i, obj) {
      //test
  });
}, 1000)

$(window).on("load",function() {
  loadMore()
  
})
