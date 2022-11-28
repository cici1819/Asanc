from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import Section, db
from datetime import datetime
from ..forms import SectionForm


section_routes = Blueprint('sections', __name__)

@section_routes.route('/<int:section_id>', methods=["GET"])
@login_required
def get_project_section(section_id):
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
        return form.errors

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
