from flask import Flask, request, g, redirect, url_for
from flask_babel import Babel
from config import Config

application = Flask(__name__)
application.config.from_object(Config)

from app.blueprints.multilingual import multilingual
application.register_blueprint(multilingual)

babel = Babel(application)

@babel.localeselector
def get_locale():
    if not g.get('lang_code', None):
        g.lang_code = request.accept_languages.best_match(
            application.config['LANGUAGES']) or application.config['LANGUAGES'][0]
    return g.lang_code

@application.route('/')
def home():
    if not g.get('lang_code', None):
        get_locale()
    return redirect(url_for('multilingual.index'))