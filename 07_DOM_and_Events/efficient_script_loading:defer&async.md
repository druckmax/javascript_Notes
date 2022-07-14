# Efficient Script Loading: defer & async

There are multiple ways to include our JS files in the HTML document: "Regular" without any attribute or with the async or defer attribute. These attributes influence the way the JS file is fetched and executed.

When we include our JS file without any attribute in the head of the HTML document, the parsing of the HTML will stop as soon as the script tag in the head will be reached, because the JS file is fetched and executed. Only after this process is finished the HTML parsing can be continued and finished. This is the point when the DOMContentLoaded event will be fired. This is not an ideal scenario, because the script will be executed before the DOM is created.
This is why we alway put the script tag just before the end of the body, when using the regular inclusion of the JS file, because the HTML is already parsed before reaching the script tag.

This way is still not ideal as well, because the script file could have been downloaded while the HTML document is still being parsed. This is where async and defer come into play. The async and defer attribute can be added to the script tag when it is included in the head of the HTML document.

When using the async attribute the JS file is fetched while the HTML being parsed. When the fetching is completed, the script will be executed immediately. After execution the rest of the HTML is being parsed and the DOMContentLoaded event is fired.

With the defer attribute, the script is fetched asynchronously, while the HTML is being parsed. Only after the parsing is finished, the script will be executed and after execution of the script the DOMContentLoaded event is fired. The execution of the script is deferred to the end of the parsing process.

![DOM_defer&async](/images/DOM_defer%26async.png)

### Async vs. Defer

A big difference between these to attributes is, that the DOMContentLoaded event usally waits for all scripts to be executed, except for a script which holds the async attribute. This means the DOMContentLoaded could also be fired before the script is being executed, e.g. if the script takes a very long time to load.

Defer on the other hand forces the DOMContentLoaded event to fire only after the script was executed.

Another big contrast is that scripts which are included with the async attribute are not guaranteed to be executed in the right or a particular order. The script that is finished loading first, will be executed first.

Using defer this is not the case and the scripts will be executed in the order in which they are declared in the code.

In conclusion, defer can be seen as the best overall solution. Especially for your own scripts or libraries you need to rely on in your own scripts.

Async on the other hand is best used for third-party scripts like Google Analytics or Ad-scripts, which do not influence or are required in order for your own scripts to function correctly.

This shows that you can and should use different loading strategies for different scripts depending on which function they will perform.

If we need to support older browser, though, we need to use the regular script inclusion just before the end of the body tag.

![DOM_defer&async_comparison](/images/DOM_async%26defer_comparison.png);