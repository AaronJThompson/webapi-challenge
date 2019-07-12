import React from 'react';
import Project from './Project';
function ProjectList(props) {
    const { projects } = props;

    return (
        <ul>
            {
                projects.map(proj => {
                    return <Project project={proj} />
                })
            }
        </ul>
    )
}

export default ProjectList;