from flask import Blueprint, jsonify, session, request
from app.models import Task, db, User
from app.forms import TaskForm
from datetime import date, datetime
import json
from operator import itemgetter
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
    assigneeId= itemgetter('assigneeId')(request.json)
    end_date = itemgetter('end_date')(request.json)
    user_id = current_user.id
    if form.validate_on_submit():
        task = Task(
        title = form.data['title'],
        description=form.data['description'],
        section_id=form.data['sectionId'],
        owner_id=user_id,
        status= form.data['status'],
        priority=form.data['priority'],
        project_id = form.data['projectId'],
        # assignee_id = assigneeId,
        # end_date = datetime.strptime(end_date,'%Y-%m-%d'),
        completed = False,
        created_at = datetime.today(),
        updated_at = datetime.today(),
        )
        if not task.user_assignee_t:
            task.assignee_id = user_id
        else:
            task.assignee_id = assigneeId

        if not task.end_date:
            task.end_date = datetime.today()
        else:
            task.end_date =datetime.strptime(task.end_date,'%Y-%m-%d')

        user =  User.query.get(request.json['assigneeId'])
        task.user_assignee_t = user
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
    end_date = itemgetter('end_date')(request.json)
    assigneeId= itemgetter('assigneeId')(request.json)
    if form.validate_on_submit():
        task = Task.query.get(task_id)
        task.title = form.data['title']
        task.description=form.data['description']
        task.status= form.data['status']
        task.priority=form.data['priority']
        task.end_date = datetime.strptime(end_date, '%Y-%m-%d')
        task.completed = form.data['completed']
        # Get the user object by assigneeId
        # user =  User.query.get(form.data['assigneeId'])
        print("^^^^^^^^^^^^^^^^^^end_date",end_date)
        if not end_date:
            task.end_date = db.null()
        else:
            task.end_date =datetime.strptime(end_date, '%Y-%m-%d')


        if not task.user_assignee_t:
            task.assignee_id = task.owner_id
        else:
            task.assignee_id = assigneeId

        user =  User.query.get(request.json['assigneeId'])
        task.user_assignee_t = user
        db.session.add(task)
        db.session.commit()
        res = task.to_dict()
        return res
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@task_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
  task = Task.query.get(task_id)
  db.session.delete(task)
  db.session.commit()
  return {'Message':'Successfully deleted'}

@task_routes.route('/<int:task_id>/complete')
@login_required
def toggleComplete(task_id):
    task = Task.query.get(task_id)
    task.completed = not task.completed
    db.session.commit()
    return task.to_dict()
