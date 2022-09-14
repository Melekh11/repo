"""init tables

Revision ID: ec79aeb5124e
Revises: 
Create Date: 2022-09-14 18:59:39.563514

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ec79aeb5124e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('organizations',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('contacts', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('surname', sa.String(length=30), nullable=False),
    sa.Column('login', sa.String(length=30), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_users_login'), 'users', ['login'], unique=True)
    op.create_table('positions',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('org_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=10), nullable=True),
    sa.ForeignKeyConstraint(['org_id'], ['organizations.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'org_id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('date_publish', sa.Date(), nullable=True),
    sa.Column('date_start', sa.Date(), nullable=False),
    sa.Column('delta_time', sa.Interval(), nullable=True),
    sa.Column('short_desc', sa.Text(length=300), nullable=False),
    sa.Column('help_desc', sa.Text(length=300), nullable=False),
    sa.Column('id_org', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_org'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('posts')
    op.drop_table('positions')
    op.drop_index(op.f('ix_users_login'), table_name='users')
    op.drop_table('users')
    op.drop_table('organizations')
    # ### end Alembic commands ###
