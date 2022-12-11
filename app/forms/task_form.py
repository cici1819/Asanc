from flask_wtf import FlaskForm
from wtforms import StringField, SelectField,DateField,BooleanField,SubmitField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Task

def valid_title(form, field):
  title = field.data
  if len(title) > 50 or len(title) < 3:
    raise ValidationError("Task title must be between 3 and 50 characters")

def valid_description(form, field):
  description = field.data
  if len(description) > 255 or len(description)<5:
    raise ValidationError("Task Description must be between 5 and 255 characters")

class TaskForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), valid_title])
  description = StringField('Description', validators=[DataRequired(), valid_description])
  status = SelectField("Status",choices=["On Track","Off Track","At Risk"])
  priority = SelectField("Priority",choices=["Low","Medium","High"])
  projectId = IntegerField("ProjectId")
  sectionId = IntegerField("SectionId")
  assigneeId=IntegerField("AssigneeId")
  end_date = DateField("Due Date")
  completed = BooleanField("Completed")
  submit = SubmitField('Create Task')
