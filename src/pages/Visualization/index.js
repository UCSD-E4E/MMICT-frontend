import Map from '../../components/Map/index.js';

import './index.css';

export default function Visualization() {
    return (
        <div id='container'>
            <div id='navbar'>
                <div id='navbar-left'>
                    <p>Mangrove ICT</p>
                </div>
                <div id='navbar-right'>
                    <p>
                        Settings
                    </p>
                    <p>
                        Logout
                    </p>
                </div>
            </div>
            <div id='progress-bar'>
                <p>progress bar component 100%</p>
            </div>
            <div id='classification'>
                <div id='stage'>
                    stage component
                </div>
                <Map/>
            </div>
        </div>
    );
}