from rapidfuzz import process

from core.product.models import Product


def search(query: str, fields: list, limit=10, threshold=80):
    matched_products = set()

    for field in fields:
        values = Product.objects.values_list(field, flat=True)
        results = process.extract(
            query, values, limit=limit, score_cutoff=threshold
        )

        matched_products.update(result[0] for result in results)

    query_filter = Product.objects.none()
    for field in fields:
        query_filter |= Product.objects.filter(
            **{f"{field}__in": matched_products}
        )

    return query_filter.distinct()
