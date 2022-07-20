import React from 'react';

// importing components
import Navbar from '../../Components/Navbar';

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <p>This is main page</p>
            </div>
        )
    }
}

export default MainPage;