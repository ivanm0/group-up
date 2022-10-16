from __main__ import app, snmaker
import uuid
from flask import url_for, request
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect
from models import *


@app.route("/request", methods=['POST'])
def create_request():
    data = request.json
    def callback(session):
        request = Request(
            id=str(uuid.uuid4()),
            group_id=data['group_id'],
            req_student_id=data['student_id'],
            status=0
        )
        session.add(request)
        return {"status": True}
    return run_transaction(snmaker, callback)

@app.route("/request/<request_id>/<status>")
def update_request(request_id, status):
    def callback(session):
        count = session.query(Request).get(request_id).update({Request.status: int(status)})
        return {"count": count}
    return run_transaction(snmaker, callback)