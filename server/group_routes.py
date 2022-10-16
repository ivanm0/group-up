from __main__ import app, snmaker
import uuid
from flask import url_for, request
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect
from models import *

@app.route("/group", methods=['POST'])
def create_group():
    data = request.json
    def callback(session):
        group = Group(
            id=str(uuid.uuid4()),
            groupname=data['groupname'],
            project_id=data['project_id'],
            student_ids="|".join(data['student_ids']),
            lock=False
        )
        session.add(group)
        return {"status": True}
    return run_transaction(snmaker, callback)