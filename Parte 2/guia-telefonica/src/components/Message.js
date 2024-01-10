import React from "react";

const Message = ({content}) => {
    if(content!== "")
    {
        return (
            <div className="div-message">
                <p className="p-message">{content}</p>
            </div>
        )
    }
    else{
        return <></>
    }
}

export default Message;