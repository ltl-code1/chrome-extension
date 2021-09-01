import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


function Content(){
    return (
        <div className="CET-container">
            <div className="circle"></div>
        </div>
    )
}

const app = document.createElement('div');
app.id = 'CET-container';
document.body.appendChild(app);
ReactDOM.render(<Content />, app);