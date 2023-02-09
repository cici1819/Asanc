from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .project_member import project_member


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar_color = db.Column(db.String(255),nullable=True)

    project_u = db.relationship(
        "Project", back_populates="user_p", cascade='all, delete'
    )

    task_owner_u = db.relationship(
        "Task", back_populates = "user_owner_t", primaryjoin='Task.owner_id==User.id',cascade='all, delete'
    )
    attachment_owner_u = db.relationship("Attachment",back_populates="user_owner_a",
                                           cascade='all, delete')
    comment_owner_u = db.relationship("Comment",back_populates="user_owner_c",
                                           cascade='all, delete')
    task_assignee_u = db.relationship(
    "Task", back_populates="user_assignee_t",
    primaryjoin='Task.assignee_id==User.id',
    cascade='all, delete'
    )

    user_project_member = db.relationship(
        "Project",
        secondary=project_member,
        back_populates="project_project_member",
        cascade="all, delete"
    )



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        user_dict = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'avatar_color':self.avatar_color,
        }
        return user_dict

    def __repr__(self):
        return f'<User model: id={self.id}, username={self.username}, email={self.email}, avatar_color={self.avatar_color},first_name={self.first_name},last_name={self.last_name}>'
