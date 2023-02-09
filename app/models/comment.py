from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Comment(db.Modal):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primart_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    task_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("tasks.id")),nullable=False)
    content = db.Column(db.String(3000),nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user_owner_c = db.relationship(
    "User", back_populates="comment_owner_u"
    )

    task_c = db.relationship(
    "Task",back_populates = "comment_t"
   )

def to_dic(self):
    comment_dict = {
        "id":self.id,
        "ownerId":self.owner_id,
        "taskId":self.task_id,
        "content":self.content,
        "created_at":str(self.created_at),
        "updated_at":str(self.updated_at)
    }
    return comment_dict
def __repr__(self):
    return f'<Comment model: id={self.id},ownerId={self.owner_id},taskId={self.task_id},content={self.content},created_at={self.created_at},updated_at={self.updated_at}>'
