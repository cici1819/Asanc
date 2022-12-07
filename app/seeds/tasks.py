from app.models import db, Task, environment, SCHEMA
from datetime import datetime,date
today = date.today()


def seed_tasks():
    task1 = Task(
        title='Requirements and Analysis',
        description='Create a customer requirement specification ',
        owner_id=1,
        assignee_id=1,
        section_id=1,
        status="On Track",
        priority="High",
        project_id=1,
        end_date=today,
        completed=False,
        created_at=today,
        updated_at=today
    )


    task2 = Task(
        title='SRS document',
        description=' Create a software requirement specification (SRS) document',
        owner_id=1,
        assignee_id=1,
        section_id=2,
        project_id=1,
        status="On Track",
        priority="High",
        end_date=today,
        completed=False,
        created_at=today,
        updated_at=today
    )


    task3 = Task(
        title='Designing the product Part 1',
        description='Full project overview,main needs and goals,target audience,functional requirements and desired set of features',
        owner_id=1,
        assignee_id=6,
        section_id=2,
        project_id=1,
        status="At Risk",
        priority="Medium",
        end_date=today,
        completed=False,
        created_at=today,
        updated_at=today

    )


    task4 = Task(
        title='Designing the product Part 2',
        description='Aesthetic aspects,non-functional details,recommendation , prohibitions and questions.',
        owner_id=1,
        assignee_id=7,
        section_id=3,
        project_id=1,
        status="At Risk",
        priority="Medium",
        end_date=today,
        completed=False,
        created_at=today,
        updated_at=today
    )


    task5 = Task(
        title='Fix deployment problem',
        description='Help customers run the application on their computers.',
        owner_id=2,
        assignee_id=3,
        section_id=8,
        project_id = 2,
        status="Off Track",
        priority="High",
        end_date=today,
        completed=False,
        created_at=today,
        updated_at=today)


    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.commit()


def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()
