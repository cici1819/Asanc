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
