# Daware (Scope) [![python version](https://img.shields.io/badge/python-v2.7.12-yellowgreen.svg)](https://www.python.org/download/releases/2.7/) [![Node version](https://img.shields.io/badge/npm-v5.6.0-green.svg)](http://nodejs.org/download/) [![mit](https://img.shields.io/npm/l/express.svg?style=plastic)](https://opensource.org/licenses/MIT) [![status](https://img.shields.io/badge/status-proof%20of%20concept-lightgrey.svg)]()

Daware(Scope) is a deep learning workflow based web application which is like an Uber for evacuation teams.

The application helps to predict before-in time who might be at a potential risk to fall in the crowd and become a threat for the stampede, it considers, users health data transmitted from the Smart Circlet via Bluetooth or Internet, GPS location, temperatures in the area and live video streaming.

Live video streaming is used to detect the posture of the person and inject it onto the transmitted data to predict when the person will be falling sick. And this data is sent to the ground personnel with victim details and location, it's like Uberification for the evacuation teams.

TODO - The application will detect the abnormal crowd movement using the live video feeds and alert the ground teams with the details of the people before time.

## Prerequisites
 * Python 2.7
 * [Flask](https://www.python.org/download/releases/2.7/)
 * Flask-CORS
 * six
 * keras
 * Requests
 * scikit-learn
 * tensorflow
 * Angular 4
 * Angular CLI 6.1.0

 ## To Star server

 ```python
  python server/app.py start
 ```

  ## To Star UI

 ```Angular
  cd ui
  ng serve
 ```
