from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def validate_username(form,field):
    username = field.data
    if len(username) <4:
        raise ValidationError("Please provide a username with at least 4 characters")

   # Checking if email has keyword "@"
def validate_email(form,field):
    email = field.data

    if "@" not in email:
        raise ValidationError("Please provide a valid email address")

   #Checking password length ,must greater than 6
def validate_password(form,field):
    password=field.data
    if len(password) <6:
        raise ValidationError("Password must be 6 characters or more")


def validate_first_name(form,field):
    firstName = field.data
    if len(firstName) > 30:
        raise ValidationError("firstName should less than 30 characters")

def validate_last_name(form,field):
    lastName = field.data
    if len(lastName) > 30:
        raise ValidationError("lastName should less than 30 characters")


class SignUpForm(FlaskForm):
    username = StringField(
        'Username', validators=[DataRequired(), username_exists,validate_username])
    email = StringField('Email', validators=[DataRequired(), user_exists,validate_email])
    firstName = StringField("First Name",validators=[DataRequired(),validate_first_name])
    lastName = StringField('Last Name', validators=[DataRequired(),validate_last_name])
    password = StringField('Password', validators=[DataRequired(),validate_password])
