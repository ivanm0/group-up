from sqlalchemy import create_engine, Column, String
from sqlalchemy.sql.sqltypes import INT, BOOLEAN
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

class Teacher(Base):
    __tablename__ = 'teachers'
    id = Column(String, primary_key=True)
    firstname = Column(String)
    lastname = Column(String)

class Course(Base):
    __tablename__ = 'courses'
    id = Column(UUID, primary_key=True)
    name = Column(String)
    teacher_id = Column(String)

class Student(Base):
    __tablename__ = 'students'
    id = Column(String, primary_key=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String)

class Enrollment(Base):
    __tablename__ = 'enrollments'
    id = Column(UUID, primary_key=True)
    student_id = Column(String)
    course_id = Column(UUID)

class Project(Base):
    __tablename__ = 'projects'
    id = Column(UUID, primary_key=True)
    course_id = Column(UUID)
    name = Column(String)
    min = Column(INT)
    max = Column(INT)

class Group(Base):
    __tablename__ = 'groups'
    id = Column(UUID, primary_key=True) 
    project_id = Column(UUID)
    student_ids = Column(String)
    lock = Column(BOOLEAN)

class Request(Base):
    __tablename__ = 'requests'
    id = Column(UUID, primary_key=True)
    group_id = Column(UUID)
    req_student_id = Column(String)
    status = Column(INT)
