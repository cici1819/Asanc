from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Attachment(db.Model):
    __tablename__ = 'attachments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key = True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    task_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("tasks.id")),nullable=False)
    name = db.Column(db.String(60), nullable=False)
    url = db.Column(db.String(1000),nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user_owner_a = db.relationship(
    "User", back_populates="attachment_owner_u"
    )

    task_a = db.relationship(
    "Task",back_populates="attachment_t"
   )

    def to_dict(self):
        attachment_dict = {
            "id":self.id,
            "ownerId":self.owner_id,
            "taskId":self.task_id,
            "name":self.name,
            "url":self.url,
            "created_at":str(self.created_at),
            "updated_at":str(self.updated_at)
        }
        return attachment_dict
    def __repr__(self):
        return f'<Attachment model: id={self.id},ownerId={self.owner_id},name={self.name},url={self.url},created_at={self.created_at},updated_at={self.updated_at}>'
