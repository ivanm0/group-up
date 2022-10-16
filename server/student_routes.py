from __main__ import app, snmaker
import uuid
from flask import url_for, request
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect
from models import Student, Request, Group



@app.route("/students", methods=['GET', 'POST'])
def students():
   if (request.method == 'POST'):
      data = request.json
      def callback(session):
         student = Student(
            id=data['id'],
            firstname=data['first'],
            lastname=data['last'],
            # email=data['email']
         )
         session.add(student)
         return {"result": True}
   
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


@app.route("/students/<student_id>/<project_id>/requests", methods=['GET'])
def view_requests(student_id, project_id):
    def callback(session):
        requests = session.query(Request).join(Group, Group.id == Request.group_id).filter(Group.project_id == project_id and Request.req_student_id == student_id)
        result = list(map(lambda request: {'id':request.id,
                                          'group_id': request.group_id,
                                          'req_student_id': request.req_student_id,
                                          'status': request.status
                                          },
                           requests))
        return {"requests": result}

    return run_transaction(snmaker, callback)
      
