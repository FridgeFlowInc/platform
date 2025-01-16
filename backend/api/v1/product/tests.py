import datetime
from http import HTTPStatus as status

from django.conf import settings
from django.test import TestCase
from ninja.testing import TestClient

from api.v1.product.views import router
from apps.product.log.models import ProductLog
from apps.product.models import Product


class ProductTest(TestCase):
    def setUp(self) -> None:
        self.test_product = {
            "name": "name",
            "category": "ctg",
            "manufacturer": "mnf",
            "quantity": 10,
            "unit": "string",
            "nutritional_value": 0,
            "total_net_weight": 0,
            "total_gross_weight": 0,
            "manufacture_date": "2025-01-11",
            "expiration_date": "2025-01-11",
            "notes": "string",
            "allergens": "string",
        }
        self.client = TestClient(
            router,
            headers={
                "Authorization": f"Bearer {settings.FRIDGE_PANEL_PASSWORD}",
            },
        )

    def test_product_creation(self):
        response = self.client.post("/", json=self.test_product)
        self.assertEqual(response.status_code, status.CREATED)

    def test_product_stats(self):
        product = Product(**self.test_product)
        product.full_clean()
        product.save()

        self.product_id = product.id

        ProductLog.objects.create(
            product_id=self.product_id,
            action_type="C",
            timestamp=datetime.date(2000, 1, 1),
            quantity_change=10,
        )
        ProductLog.objects.create(
            product_id=self.product_id,
            action_type="U",
            timestamp=datetime.date(2000, 1, 1),
            quantity_change=15,
        )
        ProductLog.objects.create(
            product_id=self.product_id,
            action_type="U",
            timestamp=datetime.date(2000, 1, 2),
            quantity_change=-8,
        )
        ProductLog.objects.create(
            product_id=self.product_id,
            action_type="D",
            timestamp=datetime.date(2000, 1, 4),
            quantity_change=-17,
        )

        product_id = str(self.product_id)
        response1 = self.client.get(
            "/"
            + product_id
            + "/stats?date_after=2000-01-01&date_before=2000-01-04"
        )
        response2 = self.client.get(
            "/"
            + product_id
            + "/stats?date_after=2000-01-01&date_before=2000-01-02"
        )
        response3 = self.client.get(
            "/"
            + product_id
            + "/stats?date_after=2000-01-03&date_before=2000-01-03"
        )
        response4 = self.client.get(
            "/"
            + product_id
            + "/stats?date_after=2000-01-04&date_before=2000-01-04"
        )

        self.assertEqual(response1.status_code, status.OK)
        self.assertEqual(response2.status_code, status.OK)
        self.assertEqual(response3.status_code, status.OK)
        self.assertEqual(response4.status_code, status.OK)

        expected1 = [
            {"quantity_change_for_date": 25, "date": "2000-01-01"},
            {"quantity_change_for_date": -8, "date": "2000-01-02"},
            {"quantity_change_for_date": -17, "date": "2000-01-04"},
        ]
        expected2 = [
            {"quantity_change_for_date": 25, "date": "2000-01-01"},
            {"quantity_change_for_date": -8, "date": "2000-01-02"},
        ]
        expected3 = []
        expected4 = [
            {"quantity_change_for_date": -17, "date": "2000-01-04"},
        ]
        self.assertEqual(response1.json()["quantity_changes"], expected1)
        self.assertEqual(response2.json()["quantity_changes"], expected2)
        self.assertEqual(response3.json()["quantity_changes"], expected3)
        self.assertEqual(response4.json()["quantity_changes"], expected4)
