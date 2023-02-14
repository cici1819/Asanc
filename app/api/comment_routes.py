from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import Comment, db
from datetime import datetime
from ..forms import CommentForm
import json


comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comment_routes.route('/<int:comment_id>', methods=["GET"])
@login_required
def get_one_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        return comment.to_dict()
    else:
        return {"errors": "Comment couldn't be found"}, 404

@comment_routes.route('/tasks/<int:task_id>', methods=["GET"])
@login_required
def get_task_comments(task_id):
    id = task_id
    task_comments = Comment.query.filter_by(task_id=id)

    if task_comments:
        return json.dumps({"comments": [comment.to_dict() for comment in task_comments]})
    else:
        return {"errors": "Comment couldn't be found"}, 404


@comment_routes.route('/new', methods=["POST"])
@login_required
def add_comment():
    # print('here')
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            owner_id=current_user.id,
            task_id=form.data["taskId"],
            content=form.data["content"],
            created_at = datetime.today(),
            updated_at =datetime.today()
        )
        db.session.add(new_comment)
        db.session.commit()
        # print("@@@@@@@@@@@@@@@@@@@@@@",new_comment)
        return new_comment.to_dict()
    else:
       return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment_by_id(comment_id):
    comment = Comment.query.get(comment_id)
    if current_user.id == comment.owner_id:
        if comment:
            db.session.delete(comment)
            db.session.commit()
            return {"messages": "Comment delete successfully"}, 200
        else:
            return {"errors": "Comment couldn't be found"}, 404
    else:
        return {'errors': ['Sorry, you are not the owner']}


@comment_routes.route('/<int:comment_id>', methods=["PUT"])
@login_required
def update_comment(comment_id):
    # print('here comment')
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(comment_id)
    if current_user.id == comment.owner_id:
        if form.validate_on_submit():
            data = form.data
            # comment = Comment.query.get(comment_id)
            if comment:
                comment.content = data['content']
                comment.taskId= data['taskId']
                db.session.commit()
                return comment.to_dict()
            else:
                return {"errors":"comment not found"},404
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
            return {'errors': ['Sorry, you are not the owner']}
