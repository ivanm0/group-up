from __main__ import app, snmaker
import uuid
from flask import url_for, request
from cockroachdb.sqlalchemy import run_transaction
from werkzeug.utils import redirect
from models import Course, Enrollment


@app.route("/course", methods = ["POST"])
def make_course():
    data = request.json
    def callback(session):
        course = Course(
            id = str(uuid.uuid4()),
            coursename = data['coursename'],
            teacher_id = data['teacher_id']
        )
        session.add(course)
    return run_transaction(snmaker, callback)

@app.route("/course/enroll")
def enroll_course():
    data = request.json
    def callback(session):
        course = session.query(Course).get(data['code'])
        if (course is None):
            return "No class with that code exists", 400
        enrollment = Enrollment(
            id = str(uuid.uuid4()),
            student_id = data['student_id'],
            course_id = course.id
        )
        session.add(enrollment)
    return run_transaction(snmaker, callback)

@app.route("/teacher/<teacher_id>/courses", methods = ["GET"])
def display_courses_teacher(teacher_id):
    def callback(session):
        courses = session.query(Course).filter(Course.teacher_id==teacher_id)
        result = list(map(lambda course: {'id': course.id,
                                        'code': course.code,
                                        'coursename': course.coursename,
                                        },
                        courses))
        return {"courses": result}
    return run_transaction(snmaker, callback)


@app.route("/student/<student_id>/courses", methods = ["GET"])
def display_courses_teacher(student_id):
    def callback(session):
        courses = session.query(Enrollment).join(Course, Course.id==Enrollment.course_id).filter(Enrollment.student_id==student_id)
        result = list(map(lambda course: {'id': course.id,
                                        'code': course.code,
                                        'coursename': course.coursename,
                                        },
                        courses))
        return {"courses": result}
    return run_transaction(snmaker, callback)

@app.route("<course_id>/projects", methods = ["GET"])
def display_projects(course_id):
    def callback(session):
        projects = session.query(Project).filter(Project.course_id==course_id)
        result = list(map(lambda project: {'id': project.id,
                                        'projectname': project.projectname,
                                        'min_size': project.min_size,
                                        'max_size': project.max_size
                                        },
                        projects))
        return {"projects": result}
    return run_transaction(snmaker, callback)
   
   
      
