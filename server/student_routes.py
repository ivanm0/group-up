from __main__ import app, snmaker
import uuid
from flask import url_for, request
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect
from models import Student



@app.route("/students", methods=['GET', 'POST'])
def students():
   if (request.method == 'POST'):
      data = request.json
      def callback(session):
         student = Student(
            id=data['id'],
            firstname=data['first'],
            lastname=data['last'],
            email=data['email']
         )
         session.add(student)
   
   else:
      def callback(session):
         students = session.query(Student).all()
         result = list(map(lambda student: {'id':student.id,
                                          'firstname': student.firstname,
                                          'lastname': student.lastname,
                                          'email': student.email
                                          },
                           students))
         return {"students": result}
   
   return run_transaction(snmaker, callback)
      
