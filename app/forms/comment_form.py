from flask_wtf import FlaskForm
from wtforms import StringField,DateField,SubmitField,IntegerField,TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

def valid_content(form, field):
  content = field.data
  if len(content) > 3000 or len(content) < 3 :
    raise ValidationError("Content must be between 3 and 3000 characters")


class CommentForm(FlaskForm):
  ownerId = IntegerField("OwnerId")
  taskId = IntegerField("TaskId",validators=[DataRequired()])
  content = TextAreaField("Content",validators=[valid_content])
