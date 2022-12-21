from flask_wtf import FlaskForm
from wtforms import StringField, SelectField,DateField,BooleanField,SubmitField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Task

def valid_title(form, field):
  title = field.data
  if len(title) > 50 or len(title) <3 :
    raise ValidationError("Task title must be between 3 and 50 characters")

def valid_description(form, field):
  description = field.data
  if len(description) > 255 :
    raise ValidationError("Task Description must be less than 255 characters")

class TaskForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(),valid_title])
  description = StringField('Description', validators=[valid_description])
  status = SelectField("Status",choices=["Null","On Track","Off Track","At Risk","",'---'])
  priority = SelectField("Priority",choices=["Null","Low","Medium","High","",'---'])
  projectId = IntegerField("ProjectId")
  sectionId = IntegerField("SectionId",validators=[DataRequired()])
  # assigneeId=IntegerField("AssigneeId")
  # end_date = DateField("Due Date")
  completed = BooleanField("Completed")
  submit = SubmitField('Create Task')
