import os

import cherrypy

class App:

    @cherrypy.expose
    def index(self):
        return "OK"

application = cherrypy.tree.mount(App(), '')

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    config = {'/static' : {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.join(current_dir, 'static')
        }}
    application.merge(config)

    cherrypy.quickstart(application)
