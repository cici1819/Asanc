from .db import db, environment, SCHEMA, add_prefix_for_prod

project_member = db.Table(
    'project_members',
    db.Model.metadata,
    db.Column('users_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('projects_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('projects.id')), primary_key=True)
)
if environment == 'production':
    project_member.schema = SCHEMA
