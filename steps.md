## How to run the project:
1. Go to the following link:
`https://github.com/NusaibahFarrukh/Attendance-System`
2. Click on the green color button which says "Code"
3. Copy the url:
`https://github.com/NusaibahFarrukh/Attendance-System.git`
4. open terminal in any folder and run this command:
`git clone https://github.com/NusaibahFarrukh/Attendance-System.git`
5. Go in the folder that just clones. Shift + Right click -> Open Terminal and run the following command:
`npm install`
`npm start`
    

## To create a new project:
To create a new react application after node is installed:
1. Open terminal
2. CD into the folder where we want to create the folder
```cd Documents```
3. Run this command to create a new react application using `create-react-app`
```npx create-react-app attendance-app```
4. cd into the new application folder that gets created
```cd attendance-app```
5. Open VS Code with the application folder opened
```code .```

Check the following files to understand the working of the react library:
- public -> index.html
- src -> index.js
- src -> app.js

Things to Read about at this point:
1. **Functional Components**
2. **Class Components**

Delete contents of `app.js` and `app.css`
Delete `logo.svg` file

src ->
	make folder `Pages`
	make folder `Components`

Pages ->
	Make folder for **Main Page** called `MainPage`

MainPage ->
	make file `index.js`
	make file `style.css`

index.js ->
```
import React from 'react';

class MainPage extends React.Component {
    render() {
        return(
            <p>This is main page</p>
        )
    }
}

export default MainPage;
```

app.js ->
```
import MainPage from './Pages/MainPage/index';

import './App.css';

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
```


Creating Navbar component in MainPage:
- Components ->
	create folder `Navbar`

- Navbar -> 
	create file `index.js`
	create file `style.css` 	

To install bootstrap into out application:
 - terminal ->
```npm install react-bootstrap bootstrap```
- check **package.json** -> dependencies to see if package is added:
```
"dependencies": {
    ...
    "bootstrap": "^5.1.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.4.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
},
```

- Add bootstrap dependencies in `index.html` file just before body closing tag (`</body?`)
- Import bootstrap css file in App.js:
	```import 'bootstrap/dist/css/bootstrap.min.css';```

