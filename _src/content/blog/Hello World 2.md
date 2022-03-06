+++
author = "Eden Crow"
title = "Hello World 2.0 and other clichéd titles"
date = "2022-01-01"
description = "An overview of the development of Eden Crow's new homepage, using Hugo, Git, Docker and more."
tags = [
    "markdown",
    "html",
    "css",
    "javascript",
    "bash",
    "git",
    "yaml",
    "hugo",
    "docker",
    "caddy",
    "plausible",
    "mailbear",
    "home assistant"
]
+++

## Introduction

The last time I updated my homepage was seven years ago. I had created the site using basic HTML & CSS picked up over the years, along with the help of the framework [Bootstrap](https://getbootstrap.com/). A lot has changed in that time (I have long since concluded being a student for one), and I have thought often of updating the information presented. In 2018, I got far with a new design created with the same tools as before. Yet, I never pushed the new site live for some reason that now escapes me. So finally, as the reader can see by no longer becoming blind from white space, I have modified and released my homepage's new look. I even added this blog in the process. As my first post, I thought it apt to explain my methods to achieve this.

<!-- Use short codes instead of rawhtml -->
{{< rawhtml >}}
<figure>
  <img src="/images/blogImages/oldHomepage.png" alt="Old Homepage">
  <figcaption style="font-size:95%"><i>Old Homepage</i></figcaption>
</figure>
<br/>
{{< /rawhtml >}}
<!-- {{< figure src="/images/blogImages/oldHomepage.png" title="Old Homepage" >}} -->

{{< rawhtml >}}
<figure>
  <img src="/images/blogImages/2018design.png" alt="2018 Redesign">
  <figcaption style="font-size:95%"><i>2018 Redesign</i></figcaption>
</figure>
{{< /rawhtml >}}

The driving factor for updating the site now is my current foray into experimenting with self-hosting and home automation using software such as [Home Assistant](https://www.home-assistant.io/) and [Plex](https://www.plex.tv/). The use of these has, in turn, pushed me to learn about the related disciplines of computer networking and systems administration. So, I decided to solidify my knowledge by writing about my developments within a blog. You see, in the past, I have tried my hand at other endeavours, such as games development. Unfortunately, none of these ended up going too far. Without a written record, I couldn't see the improvements I had made along the way. Coming back after a break also became problematic -- especially when I had added features that "just worked" without understanding the how and why.

{{< rawhtml >}}
<figure>
  <img src="/images/blogImages/unityImage.jpg" alt="A Game Dev Project Using Unity & Blender">
  <figcaption style="font-size:95%"><i>A Game Dev Project Using Unity & Blender</i></figcaption>
</figure>
{{< /rawhtml >}}

Of course, the problem with writing a blog was that I hadn't set up my homepage for such a thing. I could have done this on an external site. Many authors use third-party platforms such as [Medium](https://medium.com/) to do this, though I didn't think this would be in the spirit of learning how to do things myself. I could have also created a website using [WordPress](https://wordpress.org/). But, after using it for my blog [EdenReviews](http://www.edenreviews.com/), I didn't care much for its *Content Management System* (CMS). These options would also push me into wanting to create yet another domain name to manage; after all, who wants a terrible looking sub-domain. So, why not save the expense in money and time, and use the opportunity to overhaul my homepage simultaneously? The challenge decided, it was time to get to work.

{{< notice note >}}
I thought it best to point out a few things about this post before going further. Firstly, I've tried to highlight technical terms in italics so the reader can search for more information on specific aspects if they so choose, with standard abbreviations typed out in full followed by the acronym. For example: *HyperText Markup Language* (HTML). Likewise, I've included links to tools, services and sources where appropriate. Hopefully, these can help act as a good springboard for the curiously minded.\
I should also note that I am not writing here as a guide. These are just the steps I have taken and my understanding of those steps, which could be wrong or inefficient. If you think they are, please [get in touch](/contact) -- I would love some feedback and criticism!
{{< /notice >}}

- **Home**: The landing page for new visitors. Somewhere to give a profile picture, a concise piece of information about myself and some links to my pages on other websites.
- **About**: A more in-depth section about myself, projects and interests.
- **Blog**: Somewhere to host posts (like this one!) that can be added to over time.
- **Contact**: To provide a form for users to fill out in order to get in touch with me.

I then made a second list, this time focusing more on some more ideas around the technology and tools:
- **Simplistic**: It's only me developing and writing content. So I wouldn't need a CMS to handle multiple users or provide visual editing tools. I also wouldn't need a database or server-side programs to serve simple web pages with static content. While my interests may lie within those realms, my homepage is not somewhere I want to worry about my experiments and learning processes breaking something.
- **Standard**: It would be preferable if the systems and languages I used were somewhat standardised and used outside of the tools used during development. Using normalised solutions would allow me to learn more transferable skills and mean a more comprehensive array of documentation and online support would be available.
- **Open-source & Self-hosted**: In the same vein as the previous point, having tools that are open-sourced and can be self-hosted...
- **Themes**: I didn't want to waste my time designing the look and feel myself. A simple pre-made theme would be sufficient to get everything up quickly without worrying about making sure everything is responsive and looks okay on all the different devices that could visit. The long design process was perhaps part of the reasoning my last redesign efforts had so much work put into it without ever actually being released.
- **Secure**: Using HTTPS is not expected across the web, so much so that websites that rely on HTTP alone will have most users' web browsers throw up complaints. Having that padlock symbol appear is a must. I also decided that I didn't want any cookies on the site; having a cookie pop-up to comply with GDPR looks rather ugly, and I do not need to track individual visitors.
- **Analytics**: Despite the fact I'm not expecting a large amount of traffic, it would still be interesting to see some statistics on visitors.
- **Fast**: I want a minimal amount of dependencies to have rapid load times, even on slow connections. I also want to have quick builds for rapid prototyping and testing.
- **Low Cost**: I won't be making any money here, and I didn't want it to become a sinkhole for my paycheck to go into every month.
- **APIs**: I am attempting to push not just my home control through Home Assistant but information on my servers and services too. So, it is important to me to also get information, such as uptime and analytics, into my dashboard. Doing so will require some of the tools I use, such as for analytics, to have an API I can query to retrieve data.

With these ideas now written out, I began researching what I would need to turn my ideas into reality. For the sake of brevity, I'll skip over most of my forum-trawling and documentation, reading over technology I never decided to implement and get straight into how I developed the site.

## Frontend
### Static Site Generator
The frontend consists of what visitors see and interact with on my website. The code that is written for it (such as HTML, CSS and Javascript) is downloaded from the host server and processed by the client's web browser. Rather than write out this code myself entirely from scratch, I'm using a *Static Site Generator* (SSG) which uses templates to build the site for me. Using an SSG also means that I won't need a database to store data such as my blog posts and opens up more hosting options. I've chosen to use [Hugo](https://gohugo.io/) for my site, because...\
Installing Hugo is simple, with a small `.exe` file to install into the `PATH` directory on my Windows machine. The software can run then through the *command line* --  I'm a fan of using [Powershell](https://docs.microsoft.com/powershell/) through [Windows Terminal](https://github.com/microsoft/terminal), though the standard `cmd.exe` works fine. A new site can be created with `hugo new site [sitename]` (where `[sitename]` is the name of the project) and then tested using `hugo server`, making the site available at `localhost:1313` in a web browser. As long as that instance of the command line stays running, any changes made are automatically built and immediately updated in the browser. Seeing changes in real-time helps make development a much quicker experience.

### Code Editing & Version Control
To work on my Hugo project, I would require a way to navigate through folders and edit files. The use of Windows Explorer and Notepad could definitely work, but perhaps only for a masochist. The friendlier option was to use [Visual Studio Code](https://code.visualstudio.com/) (VSCode) by Microsoft, with which I could browse and develop my project with ease. Of course, the software includes the expected features of any code editor, such as syntax highlighting and autocomplete. But it stands apart from competitors like [Sublime Text](https://www.sublimetext.com/) and [Notepad++](https://notepad-plus-plus.org/) that I had previously used, with aspects like its built-in terminal and *version control* support. (Technically they have this though?)

{{< rawhtml >}}
<figure>
  <img src="/images/blogImages/VSCode.png" alt="Visual Studio Code">
  <figcaption style="font-size:95%"><i>Using VSCode</i></figcaption>
</figure>
<br/>
{{< /rawhtml >}}
Version control is software that tracks changes in the project over time and can be used to roll back to previous versions, [Git](https://git-scm.com/) being the most popular. In fact, I had already used Git when developing the 2012 design, using [GitHub](https://github.com/) as...

To get ready to begin development on a new version of my site with Git I followed these steps:
1. Cloned the GitHub repository with `git clone https://github.com/EdenCrow/edencrow.github.com`
2. Made and moved into a new branch with `git checkout -b 2022`
3. Removed all the files for the old design, keeping `CNAME`, `robots.txt` and `README` files
4. Staged the changes with `git add -A`

Now I had a clean branch to begin development with I could get it ready to work on a Hugo project with. I made a new folder called `src` (short for *source*, as-in source files), which is where I have stored the  files that Hugo will use to build the site. To get these files and folders set up correctly I then used Hugo's `new site` command.

{{< notice info >}}
While on GitHub, I also decided to upload an old Python script I made in 2012. It's a simple command-line program to search through a data dump of The Pirate Bay that user allisfine [released at the time](https://torrentfreak.com/download-a-copy-of-the-pirate-bay-its-only-90-mb-120209/). I added a couple of tweaks to parse user input better during the process.
***
Check out the repository here:\
[GitHub: Pirate Bay Index](https://github.com/EdenCrow/Pirate-Bay-Index)
{{< /notice >}}

### Theme
There is a range of themes available for Hugo. After browsing through them, I landed on Hugo Coder by user for its simplistic design and in-built dark mode.

#### Configuration
For my profile picture, I enlisted the help of a few users on Fiverr to create some designs for me. I used multiple sellers to come up with a selection of images and decided upon one from user. I also used Photoshop to create a Twitter banner.

### Custom Elements
While using the Coder theme provides many ways to create a personalised design and implement assets, it is missing a few features that I wanted to add.
#### Adding Custom Assets
CSS/JSS/Images (either way with CSS/JS ends up in the correct folder once built)
{{< notice info >}}
Removed unnecessary code from coder.js file
{{< /notice >}}
#### Customising Theme Files
Copying files
#### Adding a Social Icon
The Hugo Coder theme supports icons from ForkAwesome, which I'm using on my home page for links to GitHub and Twitter. However, I found no such icon available when attempting to add a link for the movie review and tracking website Letterboxd. At first, I tried to create a custom font to achieve this, though this was less trivial to integrate than I thought. So I asked about this on the Hugo forums and got a reply from user. They recommended amending the home.html file instead to check if an image is referenced instead of an icon. To then create the colour change when the user hovers over the link, I used Javascript. Also moved the image slightly down to seem more in line with the rest of the elements. No transition.

``` 
{{ if .image }}
<li>
  <a onmouseover="document.getElementById('{{ .alt }}').src='{{ .onmouseover }}'" onmouseout="document.getElementById('{{ .alt }}').src='{{ .image }}'" href="{{ .url | safeURL }}" aria-label="{{ .name }}" {{ if .rel }}rel="{{ .rel }}"{{ end }} {{ if .target }}target="{{ .target }}"{{ end }} {{ if .type }}type="{{ .type }}"{{ end }}>
    <img style="transform: translateY(8%)" id="{{ .alt }}" src="{{ .image }}" height="28" width="28" alt="{{ .alt }}">
  </a>
</li>
```
#### Contact Form
I wrote down my email address for visitors who may wish to contact me in my old design. For a better user experience in the new design, I included a form for the user to fill out. To create the form requires writing a small amount of HTML, so I made a custom Hugo shortcode by creating a file called `contact.html` in `layouts/shortcodes` and referencing it in my `contact.md` file with `{{</* contact */>}}`.\
In the file, I then used the `<form>` tag, with `<label>` and `<input>` tags for the user to enter their email and name, with a `<button>` to submit. Each label denotes the input it corresponds to with `for=[input]` and each input has an `id` and `name` so it can be referenced later, plus some `placeholder` text. For the message itself, a `<textarea>` is used instead of an input, and I've given it ten rows, which will create a scrollable area if the number of rows becomes exceeded.\
Here's how this all looks written out; note that I've included an icon in the submit button for a bit of extra style:

``` html
<form>
  <label for="name">Name:</label>
  <input type="name" id="name" name="name" placeholder="Your Name">

  <label for="email-address">Email:</label>
  <input type="email" id="email-address" name="email" placeholder="your@email.com">

  <label for="message">Message:</label>
  <textarea type="messsage" rows=10 id="message" name="message" placeholder="Type your message..."></textarea>
        
  <button type="submit"><i class="fa fa-send-o"></i> Submit</button>
</form>
```

Hosting a form online is an open invitation for bots to send off spam. Many companies try to fight this by using a *CAPTCHA* like Google's [reCAPTCHA](https://www.google.com/recaptcha) or [hCAPTCHA](https://www.hcaptcha.com/) (with CAPTCHA being an acronym for *Completely Automated Public Turing test to tell Computers and Humans Apart*). No doubt the reader has encountered the use of CAPTCHA tools online when being asked to select all the traffic lights in an image and asking themselves if the light that *just slightly* goes outside the box counts or not. Using one of these tools would indeed help prevent spam form submissions but at the cost of users' time and privacy and require the use of cookies. In fact, using CAPTCHA may also be overkill for a website like mine[^nocaptcha], which is unlikely to attract targeted spam campaigns due to its low traffic.\
So instead, I've added a field to my contact form that asks the user to enter my name. This field has an `id` of `lastname`. The idea being that a bot assumes from the ID that the form is looking for any last name, whereas a real user will know to enter my full name. When the form is processed, any forms without my name entered in this filled can then be ignored as spam.\
This field was added between the message and button areas in the same way as the name and email fields:
[^nocaptcha]: [NearCyan: You Probably Don't Need reCAPTCHA](https://nearcyan.com/you-probably-dont-need-recaptcha/)

``` html
<label for="lastname">My name (First Last):</label>
<input type="lastname" id="lastname" name="lastname" placeholder="My Name">
```

The form then got a little coat of CSS paint so that it didn't look a complete mess when displayed. To add custom CSS that wasn't written *inline* with the HTML I've added the file `user.css` to a folder in `assets/css` and denoted its use in the `config.toml` file with the line `customCSS = ["css/user.css"]`.

``` css
/* Contact Form Style */
#contact-form {
    width:100%;
}
#contact-form input {
    width: 100%;
}
#contact-form textarea {
    width: 100%;
    resize: none;
}
#submit {
    display: flex;
    justify-content: center;
    margin-top: 2em;
}
#submit button {
    cursor: pointer;
}
```

For this CSS to work a `<div>` is required around the form itself and another around the button. This last aspect finishes off the HTML, here it is now in full:

``` html
<div id="contact-form">
    <form>
        <label for="name">Name:</label>
        <input type="name" id="name" name="name" placeholder="Your Name">

        <label for="email-address">Email:</label>
        <input type="email" id="email-address" name="email" placeholder="your@email.com">

        <label for="message">Message:</label>
        <textarea type="messsage" rows=10 id="message" name="message" placeholder="Type your message..."></textarea>

        <label for="lastname">My name (First Last):</label>
        <input type="lastname" id="lastname" name="lastname" placeholder="My Name">
        
        <div id="submit">
            <button type="submit"><i class="fa fa-send-o"></i> Submit</button>
        </div>
    </form>
</div>
```

To send the form off for processing and recieving success and error responses that can be displayed to the user some Javascript code is used.
``` js
document.getElementById("demo").innerHTML
```
Processing the contact form to send me an email with its content can **not** be achieved in the frontend and, instead, relies on the *backend*. I'll cover this (and other backend aspects) a bit further below.
#### Back to Top
{{< notice note >}}
The code in this section is heavily based on this article from Anish De:\
[freeCodeCamp: How to Make a Back to Top Button and Page Progress Bar with HTML, CSS, and JavaScript](https://www.freecodecamp.org/news/back-to-top-button-and-page-progressbar-with-html-css-and-js/)
{{< /notice >}}
When writing this post and testing how it looked on the site, I came to realise it would be helpful to have a button to go back to the top of the page without using the scrollbar, as can be seen on many sites across the web. As I only need this to appear on blog posts, I needed to add this in `single.html` from `themes/layouts/blog` and so copied the file to `layouts/blog` for editing.\
To start, I added a button containing an icon under the `{{ .Content }}` shortcode:
``` html
<button class="back-to-top hidden"><i class="fa fa-angle-double-up" aria-hidden="true"></i></button>.
```
Then, I added some CSS to the `user.css` file I created in the Contact Form section, to place the button in the bottom left and hide the button so that it becomes revealed when the user scrolls down the page:
``` css
.back-to-top {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
  }
.hidden {
  display: none;
}
```
Javascript for displaying the button:
``` js
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top")

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hidden")
  } else {
    backToTopButton.classList.add("hidden")
  }
})
```
And going to top smoothly:

``` js
const goToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth"
  });
};

backToTopButton.addEventListener("click", goToTop)
```

### Hosting
Previously, I hosted my website through [GitHub Pages](https://pages.github.com/), a free service from [GitHub](https://github.com/). Using Pages allows users to publish their site files to a *repository* and have the code produced as a static website. Using this service is valuable as it enables easy use of [Git](https://git-scm.com/), which provides *version control* (software that stores and allows the rollback to previous versions of code). It is also free (with a limit of 1GB storage space and 100GB per month of bandwidth[^gitpageslimits]) and can provide SSL certificates through [Let's Encrypt](https://letsencrypt.org/). I've decided to continue using GitHub Pages for these reasons, as well as to avoid the complications of configuring and maintaining my own web server.

[^gitpageslimits]: [About GitHub Pages: Usage Limits](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)

{{< notice warning >}}
I did briefly toy with the idea of using [Cloudflare](https://www.cloudflare.com/en-gb/). However, GitHub can't provision a Let's Encrypt SSL certificate when Cloudflare proxies the site. This technicality would mean that I would either have to turn off the Cloudflare service every 90 days when the provision of a new certificate occurs or not have traffic between Cloudflare and the static site encrypted with HTTPS.
***
Further reading on this issue:\
[GitHub Gist: Custom domains, GH-pages, Cloudflare and strict SSL end-to-end encryption](https://gist.github.com/zbeekman/ac6eeb41ea7980f410959b13416d74c9)
{{< /notice >}}

There are drawbacks to this method. Primarily, I'm not gaining more experience in self-hosting by using a third-party service, which flies in the face of one of the whole reasons I started redesigning my website in the first place. However, my homepage is one of the few places I **must** keep reliably accessible. Therefore, it is perhaps not the place to be experimenting with skills I've not yet fully developed. Maybe when I am more confident about what I'm doing, I will move the site to a more self-hosted solution.\
GitHub also logs the IP addresses of visitors to my website in accordance with their privacy policy...

### Domain Name
I'm still using Cloudflare for now, but only for DNS (Domain Name System), which translates domain names (e.g. example.com) to the IP address of the server hosting the website (e.g. 123.456.789).

## Backend
{{< rawhtml >}}
<figure>
  <img src="/images/blogImages/back-end.png" alt="A Game Dev Project Using Unity & Blender">
  <figcaption style="font-size:95%"><i>An example of a user communicating with the back-end server{{< /rawhtml >}}[^backendattr]{{< rawhtml >}}</i></figcaption>
</figure>
{{< /rawhtml >}}
[^backendattr]: [Computer](https://www.flaticon.com/free-icons/computer), [server](https://www.flaticon.com/free-icons/server) and [internet](https://www.flaticon.com/free-icons/internet) icons from this image by Freepik - Flaticon

While most of my website is static, a few aspects of my requirements require server-side processing to function: analytics, uptime monitoring and the contact form. These aspects may be unnecessary, but they are an excellent addition to add to my own learning experience. I've decided to self-host these services myself rather than use existing services partly for this reason. To do so, I've created a completely separate *Virtual Private Server* (VPS) with the provider [Linode](https://www.linode.com/) to run them on. I first made and secured the server as per Linode's recommendations - including the use of [Fail2Ban](https://www.fail2ban.org/), which bans IPs that try to brute force *Secure Shell* (SSH) access (which is how the server's command-line terminal is remotely accessed).

### Containers
[Docker](https://www.docker.com/) allows the user to run software on a host machine in isolated *containers*, much like a *Virtual Machine* (VM) but using fewer resources. I've previously experienced using the tool to great effect on my home media server.

### Reverse Proxy
Using Docker is excellent, but the containers running on it are only accessible by adding the appropriate port number (e.g. *example.com:1234* where *1234* is the port number). It would be much more preferable to access them via a subdomain (e.g. *container.example.com*).

### SSL Certification
As with the front-end, I wanted the back-end services to be accessible via HTTPS. Caddy can also help achieve this.

### Email
Software within the server will need to send e-mails to my address, the best example being the contact form. To do this, one could rely on a third-party service, such as Amazon SES or SendGrid. Instead, I've installed and configured Postfix as a send-only Simple Mail Transfer Protocol (SMTP) server. This allows my services to send, but not receive, e-mail.

### Form Processing
Creating a contact form for a website requires processing to send the user-inputted information to my e-mail. Unfortunately, using a static site means we can't do this and, instead, we have to send the information to some web service that can do this processing for us. Indeed, a range of online services can provide this for us, such as Un-static, the problem being they often require a monthly fee or other such drawbacks. So, instead, I've used Amazon Web Services (AWS).

### Analytics
For seeing the analytics of my website, I wanted to use a tool that added little overhead, respected my visitors' privacy and didn't require the use of cookies. Straight away, this meant that the typical use of Google Analytics was off the table. Luckily, I stumbled upon [Plausible](https://plausible.io/), the description of which seems to be tailor-made to cater to my exact requirements. Plus, it offers a self-hosted version too!

### Monitoring
While the processes running on the backend server are less vital to the site's operation than the front end, keeping an eye on how they're running is perhaps of more relevance. Seeing if the server is performing as expected when deploying custom solutions is a much more significant advantage than just witnessing a host's uptime I have minimal control over. Linode does provide [an API](https://www.linode.com/docs/api/) that I could use to fetch information such as running status and CPU usage. Instead, I've deployed more custom solutions that allow me to view more detailed information and provide the ability to export the backend to a different host without losing access to my monitoring tools.\
The most basic type of monitoring to implement is a simple check to see if the host machine is online is alive, we'll call this *uptime monitoring*. I've configured my home servers to use [HealthChecks.io](https://healthchecks.io/) for this and have done the same here. It perhaps isn't exactly what the service is meant for and I am tempted to host my own solution with [Uptime Kuma](https://github.com/louislam/uptime-kuma) in the future, but it works for now. To do this is straightforward. I added a new check on the HealthChecks website, and then used *cron* (a command-line job scheduler) on my Linode server to send a ping by adding a single line to the *crontab* (a file to command cron jobs).\
I access the crontab with the command:
``` shell
sudo crontab -e
```
And then append this line to the bottom:
``` shell
*/30 * * * * /usr/bin/curl "https://hc-ping.com/[myID]" 2>/dev/null
```

We can break this code down into four parts.
1. ``*/30 * * * *`` This is how often the cronjob should run. In this case, every 30 minutes.
2. ``/usr/bin/curl`` Here I denoate the use of the in-built tool *curl*, which actually runs the command.
3. ``"https://hc-ping.com/[myID]"`` This is the address given to us by HealthChecks to ping, where ``[myID]`` is replaced with the ID HealthChecks has assigned.
4. ``2>/dev/null`` The final part stops any output from the command being saved on the server un-neccesarily.

Now uptime monitoring has been configured, not only can I see if my backend server is accessible over time, but HealthChecks will also send me an email if it does not receive a ping every 30 minutes (with a 1 hour grace period).

While this information is helpful, it doesn't tell us how the server performs over time or if the Docker containers are running. To see this, I've added another container hosting [Glances](https://nicolargo.github.io/glances/).

## Writing
{{< notice info >}}
In the spirit of open source and free software, I've placed all original work on this website under a [Creative Commons](https://creativecommons.org/) Licence, specifically [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).\
Here's a quick overview from the Creative Commons website:
> This license requires that reusers give credit to the creator. It allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, even for commercial purposes.
{{< /notice >}}

## Home Assistant
Seeing as my plans for this blog are to write about my current personal projects, including working with Home Assistant, I thought I would include information from my website into my dashboard and explain what I have done to do that here. I'm hoping to do a full write-up on my current Home Assistant setup in the future.
### Monitoring
Hosting on GitHub means that I likely won't run into issues with maintaining uptime. Even if I did, I wouldn't be able to fix any problems due to not having control over the servers. Despite this, I've included a way to view the site's availability within my dashboard. The main reason for this is if I decide to move to a cloud-hosted server in the future. Plus, it looks neat.

 For my home servers, I have been using HealthChecks.io to track their uptime. But, as this requires the server to ping HealthChecks, I won't be able to use this method with my static site. So instead, I've opted for using Uptime Robot, which sends a ping to my domain every 5 minutes. Using the provided integration, I can then import its data into my dashboard.

 To display the data neatly on my dashboard, I've then used the Uptime Card by Dylan Do Amaral. Here is the relevant YAML:

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

And here is how this then looks in my dashboard:

(image)
### Analytics
Unfortunately, there isn't currently any integration or HACS repositories for importing information from Google Analytics to Home Assistant. Instead, I've opted to use webhooks.
### Dashboards
Currently, I am using two different sets of dashboards to view Home Assistant: one for desktop and one for mobile. Here's how the section for my homepage information looks and the relevant yaml
#### Desktop
#### Mobile
## Conclusions & Future Content
How set-up and use went (good/bad), things that should be improved in the future.

Home assistant, plex, networking, linux 
and more.
## Further Reading
### Videos
- Fireship ([YouTube](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) & [Website](https://fireship.io/))
### Books
- [Computer Networking: A Top Down Approach](https://www.amazon.co.uk/Computer-Networking-Global-James-Kurose-dp-1292405465/dp/1292405465/)
- [The Linux Command Line: A Complete Introduction](https://www.amazon.co.uk/Linux-Command-Line-2nd/dp/1593279523/)
### Documentation
Reading the documentation online for a technology is vital in gaining an understanding on how to use it.\
Here are just some of the ones I used when developing my site:
- [Hugo Documentation](https://gohugo.io/documentation/)
- [GitHub Documentation](https://docs.github.com/)
- [Linode Documentation](https://www.linode.com/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Plausible Doucmentation](https://plausible.io/docs)