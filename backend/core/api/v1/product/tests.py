from django.conf import settings
from django.test import TestCase
from ninja.testing import TestClient

from core.api.v1.product.views import router


class ProductTest(TestCase):
    def test_product_creation(self):
        client = TestClient(
            router,
            headers={
                "Authorization": f"Bearer {settings.FRIDGE_PANEL_PASSWORD}",
            },
        )

        product = {
            "name": "string",
            "category": "string",
            "manufacturer": "string",
            "quantity": 0,
            "unit": "string",
            "nutritional_value": 0,
            "total_net_weight": 0,
            "total_gross_weight": 0,
            "manufacture_date": "2025-01-11",
            "expiration_date": "2025-01-11",
            "notes": "string",
            "allergens": "string",
        }

        response = client.post("/", json=product)
        self.assertEqual(response.status_code, 201)
