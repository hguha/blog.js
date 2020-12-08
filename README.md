# blog.js
The lightest-weight, easiest, most customizable blogging platform you'll ever see. 


## Getting Started
1. in your project folder, run: `git clone https://github.com/hguha/blog.js.git`
2. Open your project in a server. Any server will do. 
    * `sudo npm install http-server -g` followed by `http-server` is an easy option
3. Profit

## To Edit Template
The template, `blog.html` contains a "TO CUSTOMIZE" section that you can fill in. Once it's filled in, the blog is ready to use. Here are the option parameters that you can specify:

Name | Description
------------ | -------------
title | The title of the page and of the blog
subtitle | The subtitle of the blog that appears in the sidebar
filters | dictionary that maps a `filterName : filterLabel`
postsFolder | name of the folder that contains all posts
postPrefix | prefix of each post's name that will be enumerated(e.g. post1, post2, etc. has a prefix of "post" and blog1, blog2, etc. has a prefix of "blog")

## To Add/Edit Posts
Each post must be within the `postsFolder` and named as `postPrefix` followed by the next number(starting at 1). It will be a `.html` file.

Then within your post file(the sample provided is `post1.html`), the template is as follows:

```
<body>
    <div id="title">Title of Blog 1</div>
    <div id="tag">tutorial</div>
    <div id="date">22nd December, 2020</div>
    <div id="body">
        This is a sample blog post, written with raw HTML to your hearts desire.
    </div>
</body>
```

Each of the div-tag ids(`title, tag, date, body`) are necessary, along with the `<body>` tag and cannot be changed without altering the code in this version(future versions may allow any tag as a parameter to the blog object). 

## To style
I like to think my styles are pretty clean, but if you want to change them, you can
1. add/edit the styles directly within `blog.css`
2. add your own stylesheet that is linked to `blog.html`. 

I told you, insanely customizable!