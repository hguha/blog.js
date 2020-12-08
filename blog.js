class Blog {

  constructor(params) {
    this.numBlogs = 0;
    this.blogs;
    this.filters = params.filters;
    this.title = params.title;
    this.subtitle = params.subtitle;
    this.postsFolder = params.postsFolder;
    this.postPrefix = params.postPrefix;
    this.setupBlog();
  }

  async setupBlog() {
    document.title = this.title;
    document.getElementById("subtitle").innerHTML = this.subtitle;
    document.getElementById("welcome").innerHTML = this.title;

    this.numBlogs = await this.getNumBlogs() - 1;
    this.blogs = await this.getBlogs();
    if(window.location.hash) {
      let num = window.location.hash[1];
      this.loadBlog(num);
    }
    else {this.generateListing();}
    this.getFilters();
  }

  async getNumBlogs() {
    var counter = 1;
    while(true) {
          try {
              await $.get( `${this.postsFolder}/${this.postPrefix}${counter}.html`, function() {
                counter++;
              });
          } catch(ex) { return counter; }
      }
  }

  async getBlogs() {
    let blogs = [];
    for(let i = 0; i < this.numBlogs; i++ ) {
      await $.get( `${this.postsFolder}/${this.postPrefix}${Number(i+1)}.html`, function( data ) {
        let title = $(data).filter("#title").html();
        let date = $(data).filter("#date").html();
        let tag = $(data).filter("#tag").html();
        let preview = $(data).filter("#body").html();
        blogs.push({title:title, date:date, tag:tag, body:preview});
      });
    }
    return blogs;
  }

  generateListing() {
    $("#content").empty();
    for(let i = this.numBlogs-1; i >= 0; i-- ) {
        let preview = this.blogs[i].body;
        if(preview.includes("img")) preview = preview.substr(preview.indexOf("<br>")+4);
        $("#content").append(`
        <div class="post" data-type="${this.blogs[i].tag}">
          <div id="preview-title"><a href="#${Number(i+1)+"-"+this.blogs[i].title.toLowerCase().replaceAll(" ", "-")}" onclick="blog.loadBlog(${i+1})">${this.blogs[i].title}</a></div>
          <div id="preview-date">${this.blogs[i].date}</div>
          <div id="preview">${preview.slice(0,220)}...</div>
          <hr style="margin-top:5%; height:1px; background-color:lightgray; border:none">
      </div>`);
    }
  }

  loadBlog(num) {
      $("#content").load( `${this.postsFolder}/${this.postPrefix}${num}.html`, function() {
      $("#content").prepend(`<a class="back" href="#" onclick="blog.generateListing()">&#8592; Back to Listing</a>`);
      });
  }

  getFilters() {
    let keys = Object.keys(this.filters)
    let html = `<a class="active" data-filter="all">All</a>`
    for(let i = 0; i < keys.length; i++) {
      html+= `<a data-filter="${keys[i]}">${this.filters[keys[i]]}</a>`
    }

    $("#filter").append(html);
    this.createFilters($('#content [data-type]'));
    return html;
  }

  createFilters(cards) {
    let filters = $('#filter [data-filter]');
    console.log(cards, filters);
    filters.on('click', function(e) {
        filters.removeClass('active');
        $(this).addClass('active');
        var filterType = $(this).attr('data-filter');
        if (filterType == 'all') cards.fadeOut(200).promise().done(function() {cards.fadeIn(200);});
        else cards.fadeOut(200).promise().done(function() {cards.filter('[data-type = "' + filterType + '"]').fadeIn(200);});
    });
  }
};