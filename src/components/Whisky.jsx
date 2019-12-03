import React from 'react';

const Whisky = ({whisky})=>(
<div>
    <img src={whisky.ImageUrl} style={{width: '300px', height: '300px'}} alt=""/>
    <h3>{whisky.title}</h3>
</div>
);

export default Whisky;