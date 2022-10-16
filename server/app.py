from flask import Flask
app = Flask(__name__)
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker



conn_string = 'cockroachdb://paul:4nIjyhWRETtoWUbxVfRRRA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/groupup?sslmode=verify-full&options=--cluster%3Dfurry-mammal-5848'
engine = create_engine(conn_string, convert_unicode=True)
snmaker = sessionmaker(bind=engine)

import teacher_routes

@app.route("/test")
def hello_world():
   return {"msg": "Hello, World!"}

if __name__ == "__main__":
   app.run()