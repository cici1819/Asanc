from flask import Blueprint, jsonify, session, request
from app.models import Project, db, User, Section
from app.forms import ProjectForm
import json,random
from datetime import datetime
from flask_login import current_user, login_user, logout_user, login_required
from app.awsS3 import (upload_file_to_s3, allowed_file, get_unique_filename)

today = datetime.today();

project_routes = Blueprint('projects', __name__)



def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@project_routes.route('/current', methods=["GET"])
@login_required
def current_projects():
    all_projects = Project.query.order_by(Project.created_at.desc()).all()

    dicts= [project.to_dict_tasks() for project in all_projects]
    # print(dicts)
    user = current_user
    user= user.to_dict()
    to_return= []
    for project in dicts:
        # print("project users.....", project["users"])
        # print("dicts....", dicts)
        # print("printing project and user.....", project, user)
        # print("printing project obj....", project["users"])
        # print("printing project-users....", project["users"])
        if user in project["users"]:
            to_return.append(project)
    # print("to_return....", to_return)
    return json.dumps({"Projects" :to_return})


# @project_routes.route('/<int:project_id>')
# @login_required
# def single_project(project_id):
#     project = Project.query.get(project_id);

#     return project.to_dict_tasks()

@project_routes.route('/<int:project_id>')
@login_required
def single_project(project_id):
    project = Project.query.get(project_id);
    if project:
       return project.to_dict_tasks()
    else:
       return{"error": "Project couldn't be found", "statusCode": 404}


@project_routes.route('/new', methods=['POST'])
@login_required
def create_project():
    form = ProjectForm()
    data = form.data
    user_id = current_user.id
    form['csrf_token'].data = request.cookies['csrf_token']
    Colors = ['limegreen', 'darkorange', 'royalblue', 'wheat',
    'orangered', 'powderblue', "lightcoral", "teal"]
    new_project= Project(title= data["title"], icon= data["icon"],color=random.choice(Colors), description= data["description"], owner_id= user_id,created_at = datetime.today(),
        updated_at = datetime.today())

    new_project.project_project_member.append(current_user)
    db.session.add(new_project)
    db.session.commit()
    new_section=Section(
        title = "New Task Lists",
        project_id = new_project.id,
        created_at = datetime.today(),
        updated_at = datetime.today(),
    )
    db.session.add(new_section)
    db.session.commit()
    return json.dumps(new_project.to_dict_tasks())

@project_routes.route('/<int:project_id>', methods=['PUT'])
@login_required
def edit_project(project_id):
    form= ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data= form.data
        project= Project.query.get(project_id)
        project.title= data["title"]
        project.icon= data["icon"]
        project.description= data["description"]
        db.session.commit()
        return json.dumps(project.to_dict_tasks())
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@project_routes.route('/<int:project_id>', methods= ["DELETE"])
@login_required
def delete_project(project_id):
    project = Project.query.get(project_id);
    if project:
        db.session.delete(project)
        db.session.commit()
        return {'Message':'Successfully deleted'}
    else:
        return {"errors": "Project couldn't be found"}, 404
