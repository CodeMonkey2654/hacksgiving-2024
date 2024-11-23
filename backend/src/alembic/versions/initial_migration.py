"""initial migration

Revision ID: initial_migration
Revises: 
Create Date: 2024-03-14 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import sqlite

revision = 'initial_migration'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Topics table
    op.create_table('topics',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('label', sa.String(), nullable=False),
        sa.Column('icon', sa.String(), nullable=False),
        sa.Column('color', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Exhibits table
    op.create_table('exhibits',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('image', sa.String(), nullable=False),
        sa.Column('topic_id', sa.String(), nullable=False),
        sa.Column('details', sqlite.JSON, nullable=True),
        sa.ForeignKeyConstraint(['topic_id'], ['topics.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Users table
    op.create_table('users',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('interests', sqlite.JSON, nullable=True),
        sa.Column('language', sa.String(), nullable=False),
        sa.Column('reading_level', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Visits table
    op.create_table('visits',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('exhibit_id', sa.String(), nullable=False),
        sa.Column('timestamp', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['exhibit_id'], ['exhibits.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('visits')
    op.drop_table('users')
    op.drop_table('exhibits')
    op.drop_table('topics')