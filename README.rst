Having fun with d3.js and the BigCommerce API
=============================================

Why not?

Given a list of orders and there respective status do something schnazy and
visually appealing, bording on the practically unusable but cool anyway.

Organic evolution
-----------------

I started with the UX because I wanted to play with d3.js_ and knew next to
nothing about SVG_. I imagined a constellation of dots (each being an
order) one could hover on to change the status presented with text. It became
a color coded click and play thingy that I find really fun.

Initially I was going to do everything in Javascript but the BigCommerce_ API
doesn't appear to be cross domain request friendly hence put together a
CherryPy_ based "proxy" that runs locally and can be pushed on dotCloud_ in
seconds.

I also made good use of Kenneith Reiz's Requests_, it is awesome!

End result
----------

A single page "application" which asynchronously loads at startup the list of
statuses from BigCommerce_ and the order book. Displays the orders elegantly
as color coded dots (based on status).

When one clicks on a dot, an "aura" is displayed on top of the order, on which
the possible statuses fan out (the current status lays horizontally to the
right of the order). Clicking on a status, spins the fanned statuses and sends a
request to BigCommerce_ to update the relevant order.

For the next 2 weeks (as of 2012-04-29) it will work on dotCloud_ at the url
http://bigcommerce-3kwa.dotcloud.com/. After that BigCommerce_ will shut the
trial store hence no order(s) will be seen.

Verdict
-------

.. image:: static/img/d3-commerce.png

Utterly userless in practice but lots of fun to come up with and code!
d3.js_ could be an awesome way to develop interactive visualisation for tablet
(web) apps.


.. _d3.js: http://d3js.org
.. _svg: http://en.wikipedia.org/wiki/Scalable_Vector_Graphics
.. _bigcommerce: http://bigcommerce.com
.. _cherrypy: http://cherrypy.org
.. _dotcloud: http://dotcloud.com
.. _requests: http://docs.python-requests.org

