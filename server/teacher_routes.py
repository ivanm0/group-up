from __main__ import app, snmaker
import uuid
from flask import url_for, request
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect
from models import Teacher


<<<<<<< HEAD
@app.route("/teacher", methods=['GET', 'POST'])
def teacher():
   if request.method == 'POST':
      data = request.json
      def callback(session):
         teacher = Teacher(
            id=data['id'],
            firstname=data['first'],
            lastname=data['last']
         )
         session.add(teacher)
         return {"status": True}
   else:
      def callback(session):
         teachers = session.query(Teacher).all()
         result = list(map(lambda teacher: {'id': teacher.id,
                                          'firstname': teacher.firstname,
                                          'lastname': teacher.lastname,
                                          },
                           teachers))
         return {"teachers": result}
   return run_transaction(snmaker, callback)


# @app.route("/teachers")
# def teachers():
#    def callback(session):
#       teachers = session.query(Teacher).all()
#       result = list(map(lambda teacher: {'id': teacher.id,
#                                        'firstname': teacher.firstname,
#                                        'lastname': teacher.lastname,
#                                        },
#                         teachers))
#       return {"teachers": result}
#    return run_transaction(snmaker, callback)
=======

@app.route("/teachers", methods=['GET', 'POST'])
def teachers():
   if (request.method == 'POST'):
      data = request.json
      def callback(session):
         teacher = Teacher(
            id=data['id'],
            firstname=data['first'],
            lastname=data['last'],
         )
         session.add(teacher)
   
   else:
      def callback(session):
         teachers = session.query(Teacher).all()
         result = list(map(lambda teacher: {'id': teacher.id,
                                          'firstname': teacher.firstname,
                                          'lastname': teacher.lastname,
                                          },
                           teachers))
         return {"teachers": result}
   
   return run_transaction(snmaker, callback)
      


>>>>>>> 361d7a3bd0e268c5ceaef7f6b5a204f2c3243749

