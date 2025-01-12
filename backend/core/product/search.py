from rapidfuzz import process

from core.product.models import Product


def search(query_dict, limit=5, threshold=80):
    matched_products = Product.objects.all()

    for field, query in query_dict.items():
        values = Product.objects.values_list(field, flat=True)
        results = process.extract(
            query, values, limit=limit, score_cutoff=threshold
        )

        matched_values = [res[0] for res in results]
        matched_products = matched_products.filter(
            **{f"{field}__in": matched_values}
        )

    return matched_products
