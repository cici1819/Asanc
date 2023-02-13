from flask_wtf import FlaskForm
from wtforms import StringField,DateField,SubmitField,IntegerField,TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Attachment

def valid_url(form, field):
  url = field.data
  if url and not url.lower().endswith(("pdf", "png", "jpg", "jpeg", "gif","docx", "xlsx","ppt",".pptx")):
            raise ValidationError(
                'Attachment has invalid file type. File must end with "pdf", "png", "jpg", "jpeg", "gif","docx", "xlsx","ppt",".pptx"')


class AttachmentForm(FlaskForm):
  # ownerId = IntegerField("OwnerId")
  taskId = IntegerField("TaskId",validators=[DataRequired()])
  url = StringField("Url",validators=[valid_url])
  name=StringField("Name",validators=[DataRequired()])
  submit = SubmitField('Upload')
