import React from "react";

export default function Animation({ loading, setLoading }) {
    return (
        <div className="spinner" style={{ display: loading ? "block" : "none" }}>
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
    );
}
