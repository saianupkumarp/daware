from os import path

# Flask
APP_NAME = 'daware'
DEBUG = True
SERVER_HOST = 'localhost'
SERVER_PORT = 9999
SECRET_KEY = 'MMevD]z_4#hrSn*Ga!B9QkTD`>dd85kOx5LdAj)Q%>I/RW[&d{_/MFdqOj;(!dl'
THREADED = True

# Localization
CURRENT_TIMEZONE = 'Asia/Riyadh'
FALLBACK_LOCALE = 'en'

# Paths
APP_ROOT = path.dirname(path.abspath(__file__))
STATIC_ROOT = path.join(APP_ROOT, 'static')
OUTPUT_ROOT = STATIC_ROOT

# Params
COUNTRIES = ['India', 'Saudi Arabia', 'Egypt', 'Indonesia', 'Tunisisa', 'Pakistan']
RISK_PROFILE = ['HIGH', 'MEDIUM', 'LOW']