from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import Section, db
from datetime import datetime
from ..forms import SectionForm
import json


section_routes = Blueprint('sections', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@section_routes.route('/<int:section_id>', methods=["GET"])
@login_required
def get_one_section(section_id):
  section = Section.query.get(section_id)
  if section:
    return section.to_dict_task()
  else:
    return {"errors": "Section couldn't be found"}, 404


@section_routes.route('/new', methods=["POST"])
@login_required
def add_section():
    print('here')
    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_section = Section(
            title=form.data["title"],
            project_id=form.data["project_id"],
            created_at = datetime.today(),
            updated_at =datetime.today()
        )
        db.session.add(new_section)
        db.session.commit()
        return {"messages": "Section created successfully"}, 200
    else:
       return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@section_routes.route('/<int:section_id>', methods=['DELETE'])
@login_required
def delete_section_by_id(section_id):
    section = Section.query.get(section_id)

    if section:
        db.session.delete(section)
        db.session.commit()
        return {"messages": "Section delete successfully"}, 200
    else:
        return {"errors": "Section couldn't be found"}, 404


@section_routes.route('/<int:section_id>', methods=["PUT"])
@login_required
def update_section(section_id):
    print('here section')
    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        section = Section.query.get(section_id)
        section.title = data['title']
        section.project_id = data['project_id']
        db.session.commit()
        return json.dumps(section.to_dict_task())
    else:
         return {'errors': validation_errors_to_error_messages(form.errors)}, 401
