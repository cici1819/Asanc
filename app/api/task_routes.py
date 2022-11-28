from flask import Blueprint, jsonify, session, request
from app.models import Task, db
from app.forms import TaskForm
from datetime import date, datetime
import json
from flask_login import current_user, login_user, logout_user, login_required

task_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@task_routes.route('/<int:task_id>')
@login_required
def get_task(task_id):
    task = Task.query.get(task_id)
    return task.to_dict()

@task_routes.route('/current')
@login_required
def get_current_tasks():
    tasks = Task.query.filter(current_user.id == Task.owner_id or current_user.id == Task.assignee_id ).all()
    if tasks:
        return json.dumps({"Tasks": [task.to_dict() for task in tasks]})
    else:
        return {"errors": " Tasks couldn't be found"}, 404


@task_routes.route('/sections/<int:section_id>')
@login_required

def  section_tasks(section_id):
    id = section_id
    section_tasks = Task.query.filter_by(section_id=id)
    return json.dumps({"Tasks": [task.to_dict() for task in section_tasks]})

@task_routes.route('/new', methods=["POST"])
@login_required
def create_task():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = current_user.get_id()
    print("***********task-form data",form.data)
    if form.validate_on_submit():
        task = Task(
        title = form.data['title'],
        description=form.data['description'],
        assignee_id=form.data['assignee_id'],
        section_id=form.data['section_id'],
        owner_id=user_id,
        status= form.data['status'],
        priority=form.data['priority'],
        project_id = form.data['project_id'],
        end_date = form.data['end_date'],
        completed = form.data['completed'],
        created_at = datetime.today(),
        updated_at = datetime.today(),
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@task_routes.route('/<int:task_id>', methods=['PUT'])
@login_required
def edit_task(task_id):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task.query.get(task_id)
        task.title = form.data['title']
        task.description=form.data['description']
        task.assignee_id=form.data['assignee_id']
        task.status= form.data['status']
        task.priority=form.data['priority']
        task.end_date = form.data['end_date']
        task.completed = form.data['completed']
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@task_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
  task = Task.query.get(task_id)
  db.session.delete(task)
  db.session.commit()
  return {'Message':'Successfully deleted'}
