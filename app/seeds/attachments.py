from app.models import db, Attachment, environment, SCHEMA
from datetime import datetime

def seed_attachments():
    attachment1 = Attachment(
        owner_id = 1,
        task_id = 1,
        name="resume",
        url = "s3://cici-aa/cheng_cheng(cici)_resume .pdf",
        created_at= datetime.now(),
        updated_at= datetime.now(),
    )




    db.session.add(attachment1)
    db.session.commit()



def undo_attachments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.attachments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM attachments")

    db.session.commit()
