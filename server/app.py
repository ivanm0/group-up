import uuid
from flask import Flask, url_for, request
from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.dialects.postgresql import UUID
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect

app = Flask(__name__)
conn_string = 'cockroachdb://ivan:Jr6FxlLgfFYt3DykWC_YWg@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/groupup?sslmode=verify-full&options=--cluster%3Dfurry-mammal-5848'
engine = create_engine(conn_string, convert_unicode=True)
sessionmaker = sessionmaker(bind=engine)
Base = declarative_base()

class Teacher(Base):
    __tablename__ = 'teachers'
    id = Column(UUID, primary_key=True)
    firstname = Column(String)
    lastname = Column(String)

@app.route("/test")
def hello_world():
   return {"msg": "Hello, World!"}

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
   run_transaction(sessionmaker, callback)
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
   return run_transaction(sessionmaker, callback)
