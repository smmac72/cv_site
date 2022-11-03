from flask import (render_template, Blueprint, g, redirect,
                   request, current_app, abort, url_for, session)
from flask_babel import _
from flask_sqlalchemy import SQLAlchemy 
from time import gmtime, strftime
from app import application

application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://u1824195_default:Ts8F6uKQe6osTy3s@server36.hosting.reg.ru/u1824195_default'
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)

class Comments(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(10))
	date = db.Column(db.String(20))
	comment = db.Column(db.String(1000))
	pinned = db.Column(db.Boolean)

class CommentKeys(db.Model):
	stringkey = db.Column(db.String(32), primary_key=True)
	admin = db.Column(db.Boolean)
	used = db.Column(db.Boolean)

application.secret_key = b'i am buying slaves my dudes'

multilingual = Blueprint('multilingual', __name__,
                         template_folder='templates', url_prefix='/<lang_code>')

@multilingual.url_defaults
def add_language_code(endpoint, values):
    values.setdefault('lang_code', g.lang_code)

@multilingual.url_value_preprocessor
def pull_lang_code(endpoint, values):
    g.lang_code = values.pop('lang_code')

@multilingual.before_request
def before_request():
    if g.lang_code not in current_app.config['LANGUAGES']:
        adapter = application.url_map.bind('')
        try:
            endpoint, args = adapter.match(
                '/en' + request.full_path.rstrip('/ ?'))
            return redirect(url_for(endpoint, **args), 301)
        except:
            abort(404)

    dfl = request.url_rule.defaults
    if 'lang_code' in dfl:
        if dfl['lang_code'] != request.full_path.split('/')[1]:
            abort(404)

@multilingual.route('/index')
@multilingual.route('/')
def index():
    return render_template('multilingual/index.html')

@multilingual.route('/guest')
def guest():	
    result = Comments.query.all()
    keyerror = False
    if (session.get('keyerror')):
        keyerror = session['keyerror']
    session['keyerror'] = False
    return render_template('multilingual/guest.html', result=result, keyerror=keyerror)

@multilingual.route('/process', methods=['POST'])
def process():
    name = request.form['name']
    key = request.form['key']
    comment = request.form['comment']

    keyerror = False
    result = CommentKeys.query.all()
    for i in result:
        if key == i.stringkey:
            if not i.used or i.admin:
                keyerror = False
                if not i.admin:
                    i.used = True
                    db.session.commit()
                signature = Comments(name=name, date=strftime("%Y-%m-%d %H:%M:%S", gmtime()),comment=comment, pinned=i.admin)
                db.session.add(signature)
                db.session.commit()
            else:
                keyerror = True
        else:
            keyerror = True
    session['keyerror'] = keyerror
    return redirect(url_for('multilingual.guest'))