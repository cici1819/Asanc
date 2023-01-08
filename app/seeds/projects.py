from app.models import db, Project, environment, SCHEMA
from datetime import datetime
from app.seeds.users import demo, marnie, bobbie, helen, apollo, ares, athena, phoebe



def seed_projects():
    project1 = Project(
        title="CRM Project",
        description="This is a Customer Relationship Management Software",
        owner_id = 1,
        icon = "https://www.nicepng.com/png/detail/263-2630338_crm-icon-crm-system.png",
        color = "royalblue",
        created_at= datetime.now(),
        updated_at= datetime.now(),
        project_project_member=[demo, helen, athena, phoebe]

    )

    project2 = Project(
        title="ERP project",
        description="Enterprise resource planning (ERP) is a type of software that organizations use to manage day-to-day business activities such as accounting, procurement, project management, risk management and compliance, and supply chain operations.",
        owner_id = 1,
        icon="https://i.pinimg.com/originals/86/4a/57/864a57fa35c7afec98bfd1de671540c3.jpg",
        color="wheat",
        created_at= datetime.now(),
        updated_at= datetime.now(),
        project_project_member=[demo, marnie, bobbie, phoebe]
    )


    project3 = Project(

        title="Marketing plan project",
        description="product, price, promotion, place, people, process, and physical evidence.",
        owner_id = 2,
        icon="http://consultyasser.com/wp-content/uploads/2020/02/marketing-strategy-consultant.png",
        color="powderblue",
        created_at= datetime.now(),
        updated_at= datetime.now(),
        project_project_member=[demo, marnie, bobbie, phoebe,apollo,ares]


    )

    project4 = Project(

        title="Workflow project",
        description=" this workflow project is a carefully planned sequence of the tasks and activities you need to do to complete a specific project.",
        owner_id = 3,
        icon="https://cdn-icons-png.flaticon.com/512/1178/1178721.png",
        color = "lightcoral",
        created_at= datetime.now(),
        updated_at= datetime.now(),
        project_project_member=[demo, marnie, bobbie, apollo]

    )

    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.add(project4)
    db.session.commit()



def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM projects")

    db.session.commit()
