#backend functions
# Gabriel Sebastian Visan w18016914


import os

import flask
import json
import requests
import socketio
from flask import Flask, render_template,flash, request, redirect
from flask_socketio import join_room, emit, leave_room, SocketIO

from model import db
from flask import jsonify
from flask_cors import CORS
from flask_ngrok import run_with_ngrok
from functools import wraps
from datetime import datetime

#flask_jwt imports
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import verify_jwt_in_request
#bcrypt import for encrypting passwords
import bcrypt

#SQL alchemy and flask_sqlalchemy imports
import sqlalchemy as db
from sqlalchemy import Table, MetaData, Column, Integer, VARCHAR
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

#upload folder for the photos
UPLOAD_FOLDER = 'D:/photo uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


app = Flask(__name__)
#soketio declaration
socketio =SocketIO()
#deploying cors to allow requests through http tunelling
CORS(app)
socketio.init_app(app, cors_allowed_origins='*', rememberTransport=False)
#line for automaticlly runing ngrok
#run_with_ngrok(app)
#connecting the app to the jwt manager
jwt = JWTManager(app)
#configuring the connection to the mysql databse
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:sebastar13@127.0.0.1:3306/team_project'
app.config['SECRET_KEY'] = 'secret'
#adding the upload folder to the app
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


Base = declarative_base()
engine = db.create_engine('mysql+mysqlconnector://root:sebastar13@127.0.0.1:3306/team_project')
connection = engine.connect()
metadata = MetaData()
session = sessionmaker()
session.configure(bind=engine)
my_session = session()

#configuring the user table and base for login
user = Table('user', metadata,
             Column('id', Integer, primary_key=True),
             Column('email', VARCHAR(255)),
             Column('password', VARCHAR(255)),
             Column('role', Integer),
             Column('student_id', Integer),
             Column('teacher_id', Integer)
             )

class User(Base):
  __tablename__ = 'user'

  Id = Column(db.Integer, primary_key=True)
  email =db.Column(db.VARCHAR(255))
  password = db.Column(db.VARCHAR(255))
  role = db.Column(db.Integer)
  student_id =db.Column(db.Integer)
  teacher_id = db.Column(db.Integer)

#creating a custom Decorators for the teacher access level
def teacher_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["is_teacher"]:
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="teachers only!"), 403

        return decorator

    return wrapper
#declaring the sql alchemy databse
db = SQLAlchemy(app)
#creating a db model for modules
class Module(db.Model):
    __tablename__ = 'module'
    Id = db.Column(db.VARCHAR(10), primary_key=True)
    Name = db.Column(db.VARCHAR(255))
    start_date = db.Column(db.DATETIME)
    end_date = db.Column(db.DATETIME)
    teacher_id = db.Column(db.Integer)
#creating a db model for course
class Course(db.Model):
    __tablename__ ='course'
    Id = db.Column(db.VARCHAR(10), primary_key=True)
    Name = db.Column(db.VARCHAR(255))
    Modules = db.Column(db.VARCHAR(255))
    start_date = db.Column(db.DATETIME)
    end_date = db.Column(db.DATETIME)
#creating a db model for course module
class Course_Module(db.Model):
    __tablename__ ='coursemodule'
    course_id = db.Column(db.VARCHAR(10), primary_key=True)
    module_id = db.Column(db.VARCHAR(10), primary_key=True)
#creating a db model for teacher
class Teacher(db.Model):
    __tablename__ ='teachers'
    Id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR(255))
#creating a db model for room
class Room(db.Model):
    __tablename__ = 'room'
    id =db.Column(db.VARCHAR(10), primary_key=True, default=0)
    name = db.Column(db.VARCHAR(255))
    date = db.Column(db.DATETIME)
    def __init__(self,id,name,date):
        self.id =id
        self.name = name
        self.date = date
#creating a db model for room user
class Room_User(db.Model):
    __tablename__ = 'room users'
    room_id = db.Column(db.VARCHAR(10), primary_key=True)
    user_id = db.Column(db.Integer, primary_key=True)
    def __init__(self, room_id, user_id):
        self.room_id = room_id
        self.user_id = user_id
#creating a db model for message
class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.Integer, primary_key=True, default=0)
    room_id = db.Column(db.VARCHAR(10))
    user_id = db.Column(db.Integer)
    text = db.Column(db.VARCHAR(255))
    date = db.Column(db.DATETIME)
    def __init__(self, id, room_id, user_id,text,date):
        self.id = id
        self.room_id = room_id
        self.user_id = user_id
        self.text = text
        self.date = date
#creating a db model for user
class User(db.Model):
    __tablename__ = 'user'
    Id = db.Column(db.Integer, primary_key=True, default=0)
    email = db.Column(db.VARCHAR(255))
    password = db.Column(db.VARCHAR(255))
    role = db.Column(db.Integer)
    student_id = db.Column(db.Integer)
    teacher_id = db.Column(db.Integer, default=None)
    def __init__(self,id,email,password,role,student_id,teacher_id):
        self.id = id
        self.email = email
        self.password = password
        self.role = role
        self.student_id = student_id
        self.teacher_id = teacher_id

#creating a db model for students
class Students(db.Model):
        __tablename__='students'
        Id = db.Column(db.Integer, primary_key=True, default=0)
        course_id = db.Column(db.VARCHAR(10), default='cor001')
        full_name = db.Column(db.VARCHAR(35))
        home_address = db.Column(db.VARCHAR(40))
        term_address = db.Column(db.VARCHAR(40))
        def __init__ (self,id,course_id,full_name,home_address,term_address):
            self.id = id
            self.course_id = course_id
            self.full_name = full_name
            self.home_address = home_address
            self.term_address = term_address


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#function used for registration
@app.route('/register', methods=["POST"])
def register():
        request_data = request.get_json(force=True)
        course_id = request_data['course_id']
        print(request_data['home_address'])
        student_id = len(Students.query.all())
        new_student = Students(student_id, course_id, request_data['full_name'], request_data['home_address'], request_data['term_address'])
        db.session.add(new_student)
        db.session.commit()
        password = request_data['password']
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user = User(5, request_data['email'], hashed_password, 2, len(Students.query.all()), None)
        db.session.add(new_user)
        db.session.commit()
        return {"message": "Register successfully"}
#function used for uploading files
@app.route('/upload_files', methods=["GET","POST"])
def upload_files():
    request_data = request.get_json(force=True)
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    files = flask.request.files.getlist("file")
    # if user does not select file, browser also
    # submit an empty part without filename
    for file in files:
        if file and allowed_file(file.filename):
             filename = secure_filename(file.filename)
             file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#function used for getting the courses for registration
@app.route('/courses', methods=["GET","POST"])
def courses():
    courses_list = []
    for courses in Course.query.all():
        courses_list.append({"id": courses.Id, "course": courses.Name})
    return json.dumps(courses_list)
#function used for login in
@app.route("/login", methods=["GET","POST"])
def login():
      request_data = request.get_json(force=True)
      email = request_data['email']
      password = request_data['password']
      user_role = 0
      user_password= None
      for row in User.query.filter_by(email=email):
          user_password= row.password
          user_role = row.role
      #verifying the user role and creating the access token
      if user_role == 1 and password == user_password:
          access_token = create_access_token(identity=email, additional_claims={"is_teacher": True})
      elif bcrypt.checkpw(password.encode('utf-8'), user_password.encode('utf-8')):
          access_token = create_access_token(identity=email)
      else:
          return jsonify({"msg": "Wrong email or password"}), 401
     #returining the generated access token in order to access the rest of the app after authentication
      return jsonify(access_token=access_token)
#login using face recognition
@app.route("/login_face_detection", methods=["GET","POST"])
def login_face_detection():
    #requsting the identity from the model change this to be the address that the facial recognition app is running on
    identity = requests.get("http://5b48bf697d13.ngrok.io/").text
    identity = identity[1:-1]
    print(identity)
    user1 = "Alexandru"
    user2 = "Diana"
    user3 = "Sebastian"
    #the face recognition app is trained on 3 of our faces therefore the login is hardcoded
    print(user1)
    print(identity == user1)
    if identity == user1:
        user = User.query.filter_by(Id=13).first()
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token)

    elif identity == user2:
        user = User.query.filter_by(Id=2).first()
        access_token = create_access_token(identity=user.email,additional_claims={"is_teacher": True})
        return jsonify(access_token=access_token)
    elif identity == user3:
        user = User.query.filter_by(Id=6).first()
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token)
    else:
        return jsonify("unknown user")
#displays the modules for each teacher
@app.route("/display_module_teacher", methods=["GET","POST"])
@teacher_required()
def display_module_teacher():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    teacher_id = user.teacher_id
    module_ids = []
    module_list = []
    for row in Module.query.filter_by(teacher_id=teacher_id).all():
        if row.Id not in module_ids:
            module_ids.append(row.Id)
            module_list.append({"module_id": row.Id, "name": row.Name, "$start_date": row.start_date, "$end_date": row.end_date,})
    return json.dumps(module_list, default=str)


#displays the modules for the current student accessing the page
@app.route("/display_module", methods=["GET","POST"])
@jwt_required()
def display_module():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    student_id = user.student_id
    student = Students.query.filter_by(Id=student_id).first()
    course_id = student.course_id
    module_id_list = []
    for row in Course_Module.query.filter_by(course_id=course_id).all():
        if row.module_id not in module_id_list :
            module_id_list.append(row.module_id)
    module_list = []
    for module_id in module_id_list:
        for row in Module.query.filter(Module.Id == module_id).all():
            teacher_id = row.teacher_id
            teacher = Teacher.query.filter_by(Id=teacher_id).first()
            module_list.append( {"module_id": row.Id, "name": row.Name, "$start_date": row.start_date, "$end_date": row.end_date,"teacher_id ": row.teacher_id, "teacher_name": teacher.name})
    return json.dumps(module_list, default=str)
#displays the profile of the current loged in user
@app.route("/profile",  methods=["GET","POST"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    student_id = user.student_id
    student_email = user.email
    role =user.role
    course_id = 0
    student = []
    course_module = []
    #checks if the user is a teacher or student and displays their information
    if role == 2:
        for row in Students.query.filter_by(Id=student_id).all():
            course = Course.query.filter_by(Id=row.course_id).first()
            course_id = row.course_id
            course_name = course.Name
            student_id = row.Id
            student_full_name =row.full_name
            student_home_address = row.home_address
            student_term_address = row.term_address
        module_id_list = []
        for row in Course_Module.query.filter_by(course_id=course_id).all():
            module_id_list.append(row.module_id)
        print(module_id_list)
        module_list=[]
        for module_id in module_id_list:
            module = Module.query.filter_by(Id=module_id).first()
            module_list.append({"module_name": module.Name})
        print(module_list)
        student.append({"id": student_id, "full_name": student_full_name, "email": student_email, "home_address": student_home_address, "term_address": student_term_address, "course_name": course_name, "modules": module_list,"role": role})
        return json.dumps(student)
    else:
        teacher_id = user.teacher_id
        teacher_email = user.email
        role = user.role
        teacher = []
        module_list = []
        for row in Teacher.query.filter_by(Id=teacher_id).all():
            teacher_full_name = row.name
            for row in Module.query.filter(Module.teacher_id == teacher_id).all():
                module_list.append({"module_name": row.Name})
        teacher.append(
            {"id": teacher_id, "full_name": teacher_full_name, "email": teacher_email, "modules": module_list,
             "role": role})
        return json.dumps(teacher)
#displays the profiles of the teacher accessed by the user
@app.route("/profile_teacher",  methods=["GET","POST"])
@jwt_required()
def profile_teacher():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    teacher_id = user.teacher_id
    teacher_email = user.email
    role = user.role
    teacher = []
    module_list =[]
    for row in Teacher.query.filter_by(Id=teacher_id).all():
        teacher_full_name =row.full_name
        for row in Module.query.filter(Module.teacher_id == teacher_id).all():
            module_list.append({"module_name": row.Name})
    teacher.append({"id": teacher_id, "full_name": teacher_full_name, "email": teacher_email, "modules": module_list, "role": role})

    return json.dumps(teacher)
#creates a mudel chat room entry in the database
@app.route("/create_module_room",  methods=["GET","POST"])
@jwt_required()
def create_module_room():
    request_data = request.get_json(force=True)
    room_id =len(Room.query.all())
    room = Room(room_id, request_data['module_name'], datetime.now())
    db.session.add(room)
    db.session.commit()
    room_user = Room_User(room_id,request_data['teacher_id'])
    db.session.add(room_user)
    db.session.commit()
    course_id_list =[]
    for course in Course_Module.query.filter_by(module_id= request_data['module_id']).all():
        course_id_list.append(course.course_id)
    for course_id in course_id_list:
        for student in Students.query.filter_by(course_id=course_id).all():
            for row in User.query.filter_by(student_id=student.Id):
                room_user = Room_User(room_id, row.ID)
                db.session.add(room_user)
                db.session.commit()

    return json.dump({"room_id": room.Id, "name": room.name, "room_date": room.date})

#creates a private chat room between a teacher and student (unused)
@app.route("/create_private_room_student", methods=["GET","POST"])
@teacher_required()
def create_private_room_student():
    request_data = request.get_json(force=True)
    room_id = len(Room.query.all())
    current_user = get_jwt_identity()
    user_id = User.query(User.Id).filter(email=current_user).first()

    student_name = request_data['name']
    room = Room(room_id, student_name, datetime.now())
    db.session.add(room)
    db.session.commit()
    room_user = Room_User(room_id, user_id)
    db.session.add(room_user)
    db.session.commit()
    for row in User.query.filter_by(teacher_id=request_data['teacher_id']).first():
        room_user = Room_User(room_id, row.Id)
        db.session.add(room_user)
        db.session.commit()
    return json.dump({"room_id": room.Id, "name": room.name, "room_date": room.date})
#gets the id of the current user
@app.route("/get_id", methods=["GET","POST"])
@jwt_required()
def get_id():
    request_data = request.get_json(force=True)
    email = request_data['email']
    user = User.query.filter_by(email=email).first()
    id = user.Id
    role = user.role
    user_info = {"id": id, "role": role}
    return json.dumps(user_info)
#creates a chat room entry in the database
def create_room(email,room):
    email = email
    room_id = room
    print(room_id, email)
    user = User.query.filter_by(email=email).first()
    user_id= user.Id
    student_id =user.student_id
    student = Students.query.filter_by(Id=student_id).first()
    student_name = student.full_name
    room = Room(room_id,"", datetime.now())
    db.session.add(room)
    db.session.commit()
#creates a message entry in the database
def create_message(room_id, text, email):
    current_user = email
    user = User.query.filter_by(email=current_user).first()
    user_id = user.Id
    room_id = room_id
    text =text
    message_id = len(Message.query.all())+1
    time = datetime.now()
    message = Message(message_id, room_id, user_id, text, time)
    db.session.add(message)
    db.session.commit()
#displays the messages from a chat room
@app.route("/display_message", methods=["GET","POST"])
@jwt_required()
def display_message():
    request_data = request.get_json(force=True)
    room_id = request_data['room_id']
    room_message_list =[]

    for row in Message.query.filter_by(room_id=room_id).order_by(Message.date).all():
        user = User.query.filter_by(Id=row.user_id).first()
        user_email = user.email
        if user.teacher_id == None:
            student = Students.query.filter_by(Id=user.student_id).first()
            name = student.full_name
        else:
             teacher = Teacher.query.filter_by(Id=user.teacher_id).first()
             name = teacher.name

        room_message_list.append({"id": row.id, "room_id": row.room_id, "name": name, "email": user_email, "content": row.text, "date": row.date})
    return json.dumps(room_message_list, default=str)
#displays the students in the calsses of a teacher
@app.route("/display_students",  methods=["GET","POST"])
@teacher_required()
def display_students():
    current_user = get_jwt_identity()
    teacher = User.query.filter_by(email=current_user).first()
    teacher_id = teacher.Id
    module_list = []
    course_ids = []
    for modules in Module.query.filter_by(teacher_id =teacher_id):
        module_list.append(modules.Id)

        for course in Course_Module.query.filter(Course_Module.module_id == modules.Id).limit(2):
            if course.course_id not in course_ids:
                course_ids.append(course.course_id)
            print(course_ids)
            student_list = []
            for row in Students.query.filter_by(course_id=course.course_id):
                course = Course.query.filter_by(Id=row.course_id).first()
                course_name = course.Name
                student_list.append({"id": row.Id, "full_name": row.full_name, "course_name": course_name, "module": modules.Name})

    return json.dumps(student_list)
#displays the teachers for each student
@app.route("/display_teachers",  methods=["GET","POST"])
@jwt_required()
def display_teachers():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    student_id = user.student_id
    student = Students.query.filter_by(Id=student_id).first()
    course_id = student.course_id
    module_id_list = []
    for course_module in Course_Module.query.filter_by(course_id=course_id).all():
        module_id_list.append(course_module.module_id)
    print(module_id_list)
    teacher_list = []
    for modules_id in module_id_list:
        for row in Module.query.filter_by(Id=modules_id).all():
            teacher = Teacher.query.filter_by(Id=row.teacher_id).first()
            teacher_list.append({"teacher_id": teacher.Id, "name": teacher.name, "module": row.Name})

    return json.dumps(teacher_list)
#gets the accessed module
@app.route("/get_module", methods=["GET","POST"])
@jwt_required()
def get_module():
    request_data = request.get_json(force=True)
    module_id = request_data['module_id']
    row = Module.query.filter_by(Id=module_id).first()
    module_info=[]
    teacher_row = Teacher.query.filter_by(Id=row.teacher_id).first()
    module_info = {"name": row.Name,"teacher_name": teacher_row.name}

    return json.dumps(module_info)
rooms = {}
#socketio functiom for joining the chat
@socketio.on('join_chat')
def join_private_message(data):
    email = data['email']
    user = User.query.filter_by(email=email).first()
    if user.role == 2:
        student_id = user.student_id
        student = Students.query.filter_by(Id=student_id).first()
        user_name = student.full_name
    else:
        teacher_id = user.teacher_id
        teacher = Teacher.query.filter_by(Id=teacher_id).first()
        user_name =teacher.name
    room = data['room']
    id = request.sid
    if len(Room.query.filter_by(id=room).all()) == 0:
        create_room(email, room)
    if room in rooms:
        rooms[room].append(id)
        print(room)
    else:
        rooms[room] = []
        rooms[room].append(id)
    join_room(room)
#soketio function for disconnecting
@socketio.on('disconnect')
def test_disconnect():
    id = request.sid
    print(rooms)
    for key in rooms:
        if id in rooms[key]:
            room = key
            rooms[key].remove(id)

    leave_room(room)
    #emit('chat_listener', name + ' has left the room.', room=room)
#socketio function used for sending the messages
@socketio.on('send_message')
def send_message(data):
    email = data['email']
    room = data['room']
    content = data['content']
    user = User.query.filter_by(email=email).first()
    if user.teacher_id != None:
        teacher = Teacher.query.filter_by(Id=user.teacher_id).first()
        name = teacher.name
    else:
        student = Students.query.filter_by(Id=user.student_id).first()
        name = student.full_name
    print(email, room, content)
    data = {"email": email, "date": str(datetime.now()), "content": content, "name": name}
    create_message(room, content, email)
    emit('chat_listener', data, room=room)

if __name__ == "__main__":
    socketio.run(app, port=5000)