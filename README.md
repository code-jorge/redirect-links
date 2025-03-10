## Redirect Links (a.k.a. Jorgenlaces)

[![Netlify Status](https://api.netlify.com/api/v1/badges/6b7efce2-588f-476b-904c-786ea715b122/deploy-status)](https://app.netlify.com/sites/jorge-redirecting/deploys)

This sets up a small redirect service for URLs.

### The admin area

You can access the admin area by visiting `/admin`.

It is password protected, I didn't give it much thought, a simple password is all that separates you from the admin area.
No rate-limiting, no exponential backoff, no automatic logout, nothing. Just a simple password.

If you input the correct password, you will be able to see and manage redirections. You can configure the password using the environment variable `PASSWORD`.

Once you type the right `PASSWORD` you will receive the `TOKEN` variable in the response, which is what I use to authenticate you in the admin area. The `TOKEN` is stored in localStorage and sent in the headers of each admin request.

### The redirections

Any request to `/r/<short-code>` will redirect to the URL stored in "the database" for that key.

You can add new redirections by visiting `/admin` and entering the short code and the URL you want to redirect to.

Any URL patterns that don't exist will return a 404.

### The database

Okay, it's not really a database, I'm using **Netlify Blobs** to store the links.
I'm also using edge functions to intercept any requests to `/r/<short-code>` and redirect to the correct URL.

### Deploy it yourself

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/code-jorge/redirect-links)

Remember to set the environment variables `PASSWORD` and `TOKEN` when setting up the site.
