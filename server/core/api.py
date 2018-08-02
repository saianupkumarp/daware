from flask import Blueprint, current_app, jsonify, request, Flask, Response, render_template
from core import data

#Rest API
rest_api = Blueprint('rest_api', __name__)

def _paginate(items, **options):
    offset = options.get('offset', 0)
    count = options.get('count', 0)
    items = items[offset:offset + count if count > 0 else None]

    return dict(objects=items, metadata=dict(count=len(items), offset=offset))

@rest_api.route('/get_crowd_risk', methods=['GET'])
def get_dataset_profile():
    return data.get_list_of_random_location(21.422663, 39.826128, 2)