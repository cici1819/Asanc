from flask import Blueprint, jsonify, session, request
from app.models import Task, db, Attachment
from app.forms import AttachmentForm
from datetime import date, datetime
import json
from operator import itemgetter
from flask_login import current_user, login_user, logout_user, login_required
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename,delete_file_from_s3,download_file_from_s3)

attachment_routes = Blueprint('attachments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@attachment_routes.route('/<int:attachment_id>')
@login_required
def get_attachment(attachment_id):
    attachment = Task.query.get(attachment_id)
    return attachment.to_dict()

@attachment_routes.route('/current')
@login_required
def get_current_attachments():
    attachments = Attachment.query.filter(current_user.id == Attachment.owner_id).all()
    if attachments:
        return json.dumps({"attachments": [attachment.to_dict() for attachment in attachments]})
    else:
        return {"errors": " Attachments couldn't be found"}, 404


@attachment_routes.route('/<int:task_id>')
@login_required

def task_attachments(task_id):
    id = task_id
    task_attachments = Attachment.query.filter_by(task_id=id)

    return json.dumps({"attachments": [attachment.to_dict() for attachment in task_attachments]})

# AWS upload task attachment ------------------------------------------------------------------------
# upload form url to aws, and return the aws url
@attachment_routes.route('/new', methods=["POST"])
@login_required
def upload_attachment():
    if "attachment" not in request.files:
        return {"errors": "file required"}, 400
    attachment = request.files["attachment"]
    attachment.filename = get_unique_filename(attachment.filename)
    form = AttachmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        upload = upload_file_to_s3(attachment)
        if "url" not in upload:
            return upload, 400
        url = upload["url"]
        attachment = Attachment(
            owner_id=current_user.id,
            task_id=form.data['taskId'],
            name=form.data['name'],
            url=url,
            created_at = datetime.today(),
            updated_at = datetime.today(),
        )
        db.session.add(attachment)
        db.session.commit()
        return attachment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@attachment_routes.route('/<int:attachment_id>', methods=['PUT'])
@login_required
def edit_attachment(attachment_id):
    new_attachment = None
    if "attachment" in request.files:
        new_attachment = request.files["attachment"]
        new_attachment.filename = get_unique_filename(new_attachment.filename)
    attachment = Attachment.query.get(attachment_id)
    url = attachment.url
    if current_user.id == attachment.owner_id:
        form = AttachmentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if new_attachment:
                upload = upload_file_to_s3(new_attachment)
                if "url" not in upload:
                    return upload, 400
                # deleted = delete_file_from_s3(attachment.url.split(".com/")[1])
                url = upload["url"]
            attachment.task_id = form.data['taskId']
            attachment.name = form.data['name']
            attachment.url = url
            db.session.add(attachment)
            db.session.commit()
            return attachment.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Sorry, you are not the owner']}



@attachment_routes.route('/<int:attachment_id>', methods=['DELETE'])
@login_required
def delete_attachment(attachment_id):
    attachment = Attachment.query.get(attachment_id)
    if current_user.id == attachment.owner_id:
        if attachment:
            db.session.delete(attachment)
            db.session.commit()
            return {'Message':'Successfully deleted'}
        else:
            return{"Message":'Attachment could not be found'},404
    else:
        return {'errors': ['Sorry, you are not the owner']}

@attachment_routes.route('/<int:attachment_id>/download')
@login_required
def download_file(attachment_id):
    attachment = Attachment.query.get(attachment_id)
    url = attachment.url.split(".com/")[1]
    data = download_file_from_s3(url)
    return {"data": data}
