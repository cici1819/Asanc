from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Section

def valid_title(form, field):
  title = field.data
  if len(title) > 50 :
    raise ValidationError('Section title must less than 50 characters.')

class SectionForm(FlaskForm):
  title = StringField('Title', validators=[valid_title])
  projectId = IntegerField("Section Belong To Project Id")
  submit = SubmitField('Create  Project')
