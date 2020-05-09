import React from 'react';
import { Project } from "../../interfaces";

function FeaturedProjectCard(props: { project: Project}) {

  return <>
    <div className={`lg:w-1/2 p-2`}>
      <div className={`py-4`}>
        <div className={`flex flex-row`}>
          <div className={`w-24 h-24 flex-none`}>
            <img src={props.project.logo}/>
          </div>
          <div className={`flex-grow ml-4`}>
            {/*Contributor = owner role*/}
            <p className={`mb-1`}>{props.project.name} by {props.project.contributors[0].username}</p>
            <p className={`text-sm leading-tight`}>
              {props.project.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default FeaturedProjectCard;