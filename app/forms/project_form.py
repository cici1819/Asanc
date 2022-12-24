from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField,SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Project

def valid_title(form, field):
  title = field.data
  if len(title) > 30 or len(title) < 3:
    raise ValidationError('Project title must be between 3 and 30 characters.')

def valid_description(form, field):
  description = field.data
  if len(description) > 255 or len(description)<5:
    raise ValidationError("Project description must be between 5 and 255 characters")

class ProjectForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), valid_title])
  description = StringField('Description', validators=[DataRequired(), valid_description])
  icon = StringField("icon",validators=[DataRequired()])
  submit = SubmitField('Create  Project')
