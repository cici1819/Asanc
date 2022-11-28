from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Task(db.Model):
    __tablename__="tasks"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")),nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sections.id")),nullable=False)
    status = db.Column(db.String(100))
    priority = db.Column(db.String(100))
    end_date = db.Column(db.DateTime(timezone = False))
    completed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user_owner_t = db.relationship(
        "User", back_populates="task_owner_u",
        primaryjoin='Task.owner_id==User.id'
    )

    user_assignee_t = db.relationship(
        "User", back_populates="task_assignee_u",
        primaryjoin='Task.assignee_id==User.id'
    )


    section_t = db.relationship(
        "Section",back_populates = "task_s"
    )

    project_t = db.relationship (
        "Project",back_populates = "task_p"
    )

    def to_dict(self):
        task_dict =  {
        "id": self.id,
        "title": self.title,
        "description": self.description,
        "status": self.status,
        "priority": self.priority,
        "section_id": self.section_id,
        "owner_id":self.owner_id,
        "assignee_id":self.assignee_id,
        "project_id":self.project_id,
        "end_date":self.end_date.strftime("%Y-%m-%d") if self.end_date else None,
        "completed": self.completed,
        "created_at": str(self.created_at),
        "updated_at": str(self.updated_at),
        }
        return task_dict

    def __repr__(self):
        return f'<Task model: id={self.id}, title={self.title}, description={self.description},status={self.status},priority={self.priority},section_id={self.section_id},owner_id={self.owner_id},assignee_id={self.assignee_id},project_id={self.project_id},end_date={self.end_date},created_at={self.created_at},updated_at={self.updated_at}>'
