from app.models import db, Section, environment, SCHEMA
from datetime import datetime

def seed_sections():
    section1 = Section(
        project_id=1,
        title='Planning',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    section2 = Section(
        project_id=1,
        title='Design',
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    section3 = Section(
        project_id=1,
        title='Coding',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    section4 = Section(
        project_id=1,
        title='Testing && deployment',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    section5 = Section(
        project_id=2,
        title='Planning',
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    section6 = Section(
        project_id=2,
        title='Design',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    section7 = Section(
        project_id=2,
        title='Coding',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    section8 = Section(
        project_id=2,
        title='Testing && deployment',
        created_at=datetime.now(),
        updated_at=datetime.now()

    )

    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)
    db.session.add(section5)
    db.session.add(section6)
    db.session.add(section7)
    db.session.add(section8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_sections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.sections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM sections")

    db.session.commit()
