from __main__ import app, snmaker
import uuid
from flask import url_for, request
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect
from models import *


@app.route("/teachers/add", methods=['POST'])
def add_teacher():
   data = request.json
   def callback(session):
      teacher = Teacher(
         id=str(uuid.uuid4()),
         firstname=data['first'],
         lastname=data['last']
      )
      session.add(teacher)
   run_transaction(snmaker, callback)
   return redirect(url_for("teachers"))


@app.route("/teachers")
def teachers():
   def callback(session):
      teachers = session.query(Teacher).all()
      result = list(map(lambda teacher: {'id': teacher.id,
                                       'firstname': teacher.firstname,
                                       'lastname': teacher.lastname,
                                       },
                        teachers))
      return {"teachers": result}
   return run_transaction(snmaker, callback)

