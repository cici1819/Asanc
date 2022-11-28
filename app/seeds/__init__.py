from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .sections import seed_sections, undo_sections
from .tasks import seed_tasks, undo_tasks

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_tasks()
        undo_sections()
        undo_projects()
        undo_users()


    print("seed users started...")
    seed_users()
    seed_projects()
    seed_sections()
    seed_tasks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_tasks()
    undo_sections()
    undo_projects()
    undo_users()
    # Add other undo functions here
