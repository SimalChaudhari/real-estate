import React from "react";

const LoadingComponent = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                {/* Multiple Spinner Grow Elements */}
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <div className="spinner-grow text-primary" role="status">
                    </div>
                    <div className="spinner-grow text-success" role="status">
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                    </div>
                    <div className="spinner-grow text-warning" role="status">
                    </div>
                    <div className="spinner-grow text-info" role="status">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingComponent;
