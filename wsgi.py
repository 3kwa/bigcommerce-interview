import os

import cherrypy
from cherrypy.lib.static import serve_file
import requests
from requests.auth import HTTPBasicAuth

class BigCommerceAPI(object):
    """ ad-hoc BigCommerce API wrapper """

    user = 'admin'
    token = 'dd0f6a14c5dd516cde2e5cbf64342347f24a9cc8'
    url = 'https://store-bd2f8.mybigcommerce.com/api/v2/'

    def authentication(self):
        return HTTPBasicAuth(self.user, self.token)

    def get(self, api):
        url = "%s%s.json" % (self.url, api)
        return requests.get(url, auth=self.authentication())


class App:

    @cherrypy.expose
    def index(self):
        """ single HTML page web application """
        single = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            'index.html')
        return serve_file(single)

    @cherrypy.expose
    def statuses(self):
        """ contact BigCommerce to get a list of all statuses """
        big = BigCommerceAPI()
        response = big.get('orderstatuses')
        return response.text

    @cherrypy.expose
    def orders(self):
        """ contact BigCommerce to get the order book """
        big = BigCommerceAPI()
        response = big.get('orders')
        return response.text

application = cherrypy.tree.mount(App(), '')

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    config = {'/static' : {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.join(current_dir, 'static')
        }}
    application.merge(config)

    cherrypy.quickstart(application)
