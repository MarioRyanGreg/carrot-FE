# MITRAIS CARROT PROJECT FRONTEND

## Install

    $ git clone https://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/mitrais-carrot-FE-teamB
    $ cd mitrais-carrot-FE-teamB
    $ npm install

## Setup backend url (if you have another port on your backend API)
## Open src/libs/Config.js

```json
export const CONF = {
			CarrotApiEnpoint: 'http://localhost:9000/api/v1/', // change on this
			CarrotApiUsername: 'carrot',
			CarrotApiPassword: 'dev'
		};
```

## Start & watch

    $ npm start

## Simple build for production

    $ npm run build

## Open browser http://localhost:8000
---

## File Structure

### src/App.js

Main layout component

#### src/libs/Routes.js

Register new component into routes 

#### src/views

here is where the CRUD file placed.