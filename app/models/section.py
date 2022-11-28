from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Section(db.Model):
    __tablename__ = "sections"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), nullable = False)
    created_at = db.Column(db.DateTime,default=datetime.now() )
    updated_at = db.Column(db.DateTime, default=datetime.now())
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable = False)

    project_s = db.relationship(
        "Project", back_populates="section_p")
    task_s = db.relationship(
        "Task", back_populates="section_t", cascade='all, delete')



    def to_dict(self):
        section_dict={
            'id': self.id,
            'title': self.title,
            'project_id': self.project_id,
            'created_at' : str(self.created_at),
            'updated_at' : str(self.updated_at)
        }

        return section_dict

    def to_dict_task(self):
        section_tasks_dict = {
            "id": self.id,
            "title": self.title,
            "project_id": self.project_id,
            "tasks": [task.to_dict() for task in self.task_s],
        }
        return section_tasks_dict

    def __repr__(self):
        return f'<Section model: id={self.id}, title={self.title}, created_at={self.created_at},updated_at={self.updated_at}>'
