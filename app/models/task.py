from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Task(db.Model):
    __tablename__="tasks"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30),default="New Task",nullable=False)
    description = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")),nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sections.id")),nullable=False)
    status = db.Column(db.String(100))
    priority = db.Column(db.String(100))
    end_date = db.Column(db.DateTime(timezone = False))
    completed = db.Column(db.Boolean, default=False)
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

    attachment_t = db.relationship("Attachment",back_populates="task_a",cascade='all, delete')

    section_t = db.relationship(
        "Section",back_populates = "task_s"
    )

    project_t = db.relationship (
        "Project",back_populates = "task_p"
    )
    comment_t = db.relationship (
        "Comment",back_populates = "task_c"
    )

    def to_dict(self):
        task_dict =  {
        "id": self.id,
        "title": self.title,
        "description": self.description,
        "status": self.status,
        "priority": self.priority,
        "sectionId": self.section_id,
        "ownerId":self.owner_id,
        "assigneeId":self.assignee_id,
        "projectId":self.project_id,
        "end_date":self.end_date.strftime("%Y-%m-%d") if self.end_date else None,
        "completed": self.completed,
        "created_at": str(self.created_at),
        "updated_at": str(self.updated_at),
        'assignee': {
                "id":self.user_assignee_t.id,
                'firstName': self.user_assignee_t.first_name,
                'lastName':self.user_assignee_t.last_name ,
                'avatar_color':self.user_assignee_t.avatar_color,
            } if self.assignee_id else None,
        "attachments":[attachment.to_dict() for attachment in self.attachment_t],
        "comments":[comment.to_dict() for comment in self.comment_t]
        }
        return task_dict

    def __repr__(self):
        return f'<Task model: id={self.id}, title={self.title}, description={self.description},status={self.status},priority={self.priority},sectionId={self.section_id},ownerId={self.owner_id},assigneeId={self.assignee_id},projectId={self.project_id},end_date={self.end_date},created_at={self.created_at},updated_at={self.updated_at}>'
