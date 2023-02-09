from app.models import db, Comment, environment, SCHEMA
from datetime import datetime

def seed_comments():
    comment1 = Comment(
        owner_id = 1,
        task_id = 1,
        content = "All done, the attachment can download now",
        created_at= datetime.now(),
        updated_at= datetime.now(),
    )




    db.session.add(comment1)
    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
