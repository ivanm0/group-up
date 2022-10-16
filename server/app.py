from flask import Flask
from models import Teacher, Student
app = Flask(__name__)
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from cockroachdb.sqlalchemy import run_transaction

conn_string = 'cockroachdb://paul:4nIjyhWRETtoWUbxVfRRRA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/groupup?sslmode=verify-full&options=--cluster%3Dfurry-mammal-5848'
engine = create_engine(conn_string, convert_unicode=True)
snmaker = sessionmaker(bind=engine)

import teacher_routes

@app.route("/test")
def hello_world():
   return {"msg": "Hello, World!"}

@app.route("/existing_user/<user_id>")
def existing_user(user_id):
   def callback(session):
      is_teacher = session.query(Teacher).filter(Teacher.id == user_id).count() > 0
      is_student = session.query(Student).filter(Student.id == user_id).count() > 0

      return {"existing": is_teacher or is_student}
   return run_transaction(snmaker, callback)

if __name__ == "__main__":
   app.run()