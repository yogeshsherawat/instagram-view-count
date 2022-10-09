import requests

headers = {'Accept-Encoding': 'identity'}
headers['cookie'] = '<cookie_data_for_your_account>'
headers['user-agent'] = '<user-agent>'
headers['x-csrftoken'] = '<csrf_token>'
headers['x-ig-app-id'] = '<app_id>'

response = requests.get(info_url, headers=headers)
data = response.json()
item = data['items'][0]
value = item.get('play_count')

# This value contains view count of the reel
