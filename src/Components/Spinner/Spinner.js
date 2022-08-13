import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "700px" }}>
            <div className="loader">Loading...</div>
        </div>
    );
};

export default Spinner;