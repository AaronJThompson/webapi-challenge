import React from 'react';

function Project(props) {
    const { name, description } = props.project;

    return (
        <li>
            <h2>{name}</h2>
            <h4>{description}</h4>
        </li>
    )
}

export default Project;