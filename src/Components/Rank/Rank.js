import React from "react";

const Rank = ({ username, entries }) => {
    return(
        <div>
            <div className="white f3">
            {`${username} your current count of images is...`}
            </div>
            <div className="white f2">
            {entries}
            </div>
        </div>
    )
}

export default Rank;