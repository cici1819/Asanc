from .db import db, environment, SCHEMA, add_prefix_for_prod
from . project_member import project_member
from datetime import datetime
class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(
    add_prefix_for_prod('users.id')), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(255),nullable=True)
    icon = db.Column(db.String(255), default = "https://thumbnail.imgbin.com/18/11/8/business-essential-icon-project-icon-vkR5utvD_t.jpg",nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user_p = db.relationship(
        "User", back_populates="project_u"
    )


    section_p = db.relationship(
        "Section",back_populates = "project_s",
        cascade='all, delete'
    )

    task_p = db.relationship (
        "Task",back_populates = "project_t",
        cascade='all, delete'
    )
    project_project_member = db.relationship(
        "User",
        secondary=project_member,
        back_populates="user_project_member",
    )

# stop case:
    def to_dict(self):
        project_dict= {
            "id": self.id,
            "title": self.name,
            "owner_id": self.owner_id,
            "description": self.description,
            "color": self.color,
            "icon": self.icon,
            "created_at":str(self.created_at),
            "updated_at":str(self.updated_at),
        }
        return project_dict

    def to_dict_tasks(self):
        poject_task_dict = {
            "id": self.id,
            "title": self.title,
            "owner_id": self.owner_id,
            "description": self.description,
            "color": self.color,
            "icon":self.icon,
            "created_at": str(self.created_at),
            "updated_at": str(self.updated_at),
            "tasks": [task.to_dict() for task in self.task_p],
            "sections": [section.to_dict_task() for section in self.section_p ],
            "users": [user.to_dict() for user in self.project_project_member]
        }
        return poject_task_dict


    def __repr__(self):
        return f'<Project model: id={self.id}, title={self.title}, owner_id={self.owner_id}, description={self.description}, color={self.color}, icon={self.icon},created_at={self.created_at},updated_at={self.updated_at}>'
