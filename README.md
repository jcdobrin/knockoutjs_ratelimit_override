# knockout.ratelimit_override

An override to the rateLimit extender for the [knockout.js](https://github.com/SteveSanderson/knockout) project. Adds ability to immediately notify changes instead of waiting for rateLimit timeout

## Getting Started
Download the code 
  [here](https://raw.githubusercontent.com/jcdobrin/knockoutjs_ratelimit_override/main/knockout.ratelimit_override.js) and include in project.

## Usage

This extender modifies the rateLimit extender [knockout.js rateLimit](https://knockoutjs.com/documentation/rateLimit-observable.html). Include the javascript file, `knockout.ratelimit_override.js`, in your script imports or script bundle.

To immediately notify a value in a rateLimit observable by:

    // 5 second rate limit observable after changes stop
    let obs = ko.observable().extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });

    //just setting this will take 5 seconds before notification of change is pushed.
    obs('takes 5 seconds')

    //calling .force() triggers the the change immediately
    //this is useful if you want to have a ratelimit after changes stop but
    //also want to force a change notification on something click a button click
    obs.force()

    //calling .forceValue(val) sets a value and automatically triggers
    //shorthand for obs(val).force()
    obs.forceValue(val);
