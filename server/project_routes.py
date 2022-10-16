from __main__ import app, snmaker
import uuid
from flask import url_for, request
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect
from models import *


@app.route("/project", methods=['POST'])
def create_project():
    data = request.json
    def callback(session):
        project = Project(
            id=str(uuid.uuid4()),
            course_id=data['course_id'],
            projectname=data['projectname'],
            min_size=data['min_size'],
            max_size=data['max_size']
        )
        session.add(project)
        return {"status": True}
    return run_transaction(snmaker, callback)

@app.route("/project/<project_id>/groups")
def get_all_project_groups(project_id):
    def callback(session):
        groups = session.query(Group).filter(Group.project_id==project_id).all()
        return {"groups": list(map(lambda group: {"id": group.id, "project_id": group.project_id, "student_ids": group.student_ids.split("|")}, groups))}
    return run_transaction(snmaker, callback)
    