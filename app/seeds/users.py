from app.models import db, User, environment, SCHEMA

Colors = ['limegreen', '#FF9966', '#72A0C1', '#FFBF00',
          'orangered',  '#0093AF', 'lightcoral',  '#FBCEB1']
# Adds a demo user, you can add other users here if you want
#user1
demo = User(
    username='Demo',
    email='demo@aa.io',
    first_name="Windy",
    last_name="White" ,
    password='password',
    avatar_color=Colors[0])
#user2
marnie = User(
        username='marnie',
        email='marnie@aa.io',
        first_name="Yin",
        last_name="Hua",
        password='password',
        avatar_color=Colors[1])
#user3
bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        first_name="Noah",
        last_name="Green",
        password='password',
        avatar_color=Colors[2])
# user 4
apollo = User(
    username='Apollo',
    first_name="William",
    last_name="Hai",
    email='apollo@aa.io',
    password='password',
    avatar_color=Colors[3])
# user 5
ares = User(
    username='Ares',
    email='ares@aa.io',
    first_name = "Ava",
    last_name="Levine",
    password='password',
    avatar_color=Colors[4])
# user 6
athena = User(
    username='Athena',
    email='athena@aa.io',
    first_name="Mia",
    last_name="Elsher",
    password='password',
    avatar_color=Colors[5])
# user 7
phoebe = User(
    username='Phoebe',
    email='phoebe@aa.io',
    first_name="Amelia",
    last_name="Hansley",
    password='password',
    avatar_color=Colors[7])
# user 8
helen = User(
    username='Helen',
    email='helen@aa.io',
    first_name="Jacob",
    last_name="Ford",
    password='password',
    avatar_color=Colors[3])

def seed_users():
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(apollo)
    db.session.add(ares)
    db.session.add(athena)
    db.session.add(phoebe)
    db.session.add(helen)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
