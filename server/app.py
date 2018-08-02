from flask import Flask, render_template
from core.api import rest_api
from core.commands import command_manager
import settings

#Flask App
app = Flask(__name__, static_url_path='/assets')
app.config.from_object(settings)

#ferret Rest api
app.register_blueprint(rest_api, url_prefix='/api')


#Commands
manager = command_manager(app)

@app.after_request
def adding_header_content(head):
    head.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    head.headers["Pragma"] = "no-cache"
    head.headers["Expires"] = "0"
    head.headers['Cache-Control'] = 'public, max-age=0'
    return head

# @app.route('/')
# def index():
#     return render_template('intro.html')

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

if __name__ == "__main__":
    manager.run()