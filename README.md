# CTS next generation
![large](https://img.shields.io/badge/size-large-red.svg?longCache=true&style=for-the-badge)

![frontend](https://img.shields.io/badge/frontend-blueviolet.svg?longCache=true&style=for-the-badge)
![fullstack](https://img.shields.io/badge/fullstack-red.svg?longCache=true&style=for-the-badge)
![javascript](https://img.shields.io/badge/javascript-informational.svg?longCache=true&style=for-the-badge)
![single page application](https://img.shields.io/badge/single_page_application-important.svg?longCache=true&style=for-the-badge)
![css](https://img.shields.io/badge/css-9cf.svg?longCache=true&style=for-the-badge)
![tdd](https://img.shields.io/badge/test_driven_development-success.svg?longCache=true&style=for-the-badge)

Lets make next years CTS site the best one yet!

You have been tasked to develop the CTS site for next years conference.

__General requirements__
 * Choose whatever programming language and/or framework you would like
 * Single page application (SPA)
 * Mobile first!
 * Data is backed by provided static JSON files and images 
 * Test-Driven Development
 
## Step 1 - Support registration
Your colleagues should be able to register for CTS.

## Step 2 - Speakers presentation page
Image of the speaker, information about their upcoming talk etc. Also you have the freedom to add functionality you think would be nice-to-have.

## Step 3 - Schedule page
Generate and visualize the conference schedule from provided JSON.

## Step 4 - Functionality to make your own schedule
A visitor registered for the conference should be able to select a track of the talks they plan to attend. This should be visualized as an individual schedule.

## Step 5 - Make schedule adapt to current time
If at the day of the event make the most relevant events "more" visible somehow.

## Extra materials
You did't find that challenging enough?! ;) Well, we have some extra goodies for you!

### Step 6 - Serve JSON data via API
Serve data through an API.

### Step 7 - Possible to change data
Make it possible to change data through an admin view. This also includes uploading new images.

### Step 8 - CI/CD
Build and deploy your CTS site automatically when code are pushed to _master_ at the location of your choice.

### Step 9 - Tune for performance
Now it is time to tune your resulting web application for performance.

Tools well suited for this exercise are:

 * [Ngrok](https://ngrok.com/) nice tool to expose local applications (or behind firewalls) to a public reachable URL. This will be especially useful to be able to use performance analysis tools such as PageSpeed Insights.
 * [PageSpeed](https://developers.google.com/speed/) - measures the performance of your site. The result should be flawless. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) works well.
 * [Sitespeed.io](https://www.sitespeed.io/) - Command based tool for various measurements.
 * [curl](http://en.wikipedia.org/wiki/CURL) - Tool to check request headers e.g. curl -s -v -o /dev/null http://localhost:8080
 