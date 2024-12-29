# Generated by Django 5.1.4 on 2024-12-27 17:08

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('category', models.CharField(max_length=200)),
                ('manufacturer', models.CharField(max_length=200)),
                ('quantity', models.FloatField()),
                ('unit', models.CharField(max_length=50)),
                ('nutritional_value', models.FloatField()),
                ('total_net_weight', models.FloatField()),
                ('total_gross_weight', models.FloatField()),
                ('manufacture_date', models.DateField()),
                ('expiration_date', models.DateField()),
                ('notes', models.TextField()),
                ('allergens', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ProductLog',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('action_type', models.TextField(choices=[('create', 'create'), ('update', 'update'), ('delete', 'delete')])),
                ('description', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_log', to='product.product')),
            ],
        ),
    ]