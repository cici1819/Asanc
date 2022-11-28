from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Section

def valid_title(form, field):
  title = field.data
  if len(title) > 50 or len(title) < 3:
    raise ValidationError('Project title must be between 3 and 50 characters.')

class SectionForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), valid_title])
  project_id = IntegerField("Section Belong To Project Id")
  submit = SubmitField('Create  Project')
