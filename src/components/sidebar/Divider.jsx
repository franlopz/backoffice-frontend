import React from 'react';

const Divider = ({color , height = 0.5, opacity = 0.5, margin ='10px 0px 10px 0px'}) => {

    return(
        <hr style={{
            color: color,
            backgroundColor: color,
            height: height,
            borderColor: color,
            opacity: opacity,
            margin: margin,
        }} />
    )
};

export default Divider;