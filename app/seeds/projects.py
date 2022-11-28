from app.models import db, Project, environment, SCHEMA
from datetime import datetime
from app.seeds.users import demo, marnie, bobbie, helen, apollo, ares, athena, phoebe



def seed_projects():
    project1 = Project(
        title="CRM Project",
        description="This is a Customer Relationship Management Software",
        owner_id = 1,
        icon = "https://cdn-icons-png.flaticon.com/512/3921/3921503.png",
        color = "royalblue",
        created_at= datetime.now(),
        updated_at= datetime.now(),
        project_project_member=[demo, helen, athena, phoebe]

    )

    project2 = Project(
        title="ERP project",
        description="Enterprise resource planning (ERP) is a type of software that organizations use to manage day-to-day business activities such as accounting, procurement, project management, risk management and compliance, and supply chain operations.",
        owner_id = 1,
        icon="https://banner2.cleanpng.com/20180825/qgk/kisspng-enterprise-resource-planning-software-testing-pene-erp-corewin-5b8169ead0f075.7095392615352079148558.jpg",
        color="wheat",
        created_at= datetime.now(),
        updated_at= datetime.now(),
        project_project_member=[demo, marnie, bobbie, phoebe]
    )


    project3 = Project(

        title="Marketing plan project",
        description="product, price, promotion, place, people, process, and physical evidence.",
        owner_id = 2,
        icon="https://banner2.cleanpng.com/20180610/yq/kisspng-marketing-plan-marketing-strategy-5b1d159365ca02.4534517815286327234169.jpg",
        color="powderblue",
        created_at= datetime.now(),
        updated_at= datetime.now(),
        project_project_member=[demo, marnie, bobbie, phoebe,apollo,ares]


    )

    project4 = Project(

        title="Workflow project",
        description=" this workflow project is a carefully planned sequence of the tasks and activities you need to do to complete a specific project.",
        owner_id = 3,
        icon="https://w7.pngwing.com/pngs/834/603/png-transparent-workflow-computer-icons-business-process-business-people-business-business-process.png",
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
