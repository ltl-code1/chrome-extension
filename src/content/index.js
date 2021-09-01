import React from 'react';
import ReactDom from 'react-dom';


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
ReactDom.render(<Content />, app);