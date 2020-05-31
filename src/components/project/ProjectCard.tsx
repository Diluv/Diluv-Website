import React from 'react';
import { Project } from '../../interfaces';
import Link from "next/link";
import UserGroup from "../icons/UserGroup";

const ago = require('s-ago');

type Props = {
  gameSlug: string
  projectTypeSlug: string
  project: Project
};

function format(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function listContributors(project: Project) {
  let arr = [];
  let count = 0;
  for (let contributor of project.contributors) {
    count++;
    arr.push(<span key={contributor.username}>
      <Link href={`/author/${contributor.username}/`}>
        <a
          className={"hover:text-diluv-500"}>{contributor.username}</a>
      </Link>
      {(count) !== project.contributors.length && <span className={"mr-1"}>,</span>}
    </span>)
  }
  return arr;
}

function ProjectCard({ gameSlug, projectTypeSlug, project }: Props) {
  let createdAt: Date = new Date(0);
  createdAt.setUTCSeconds(project.createdAt);
  let updatedAt = new Date(0);
  updatedAt.setUTCSeconds(project.updatedAt);


  return <>
    <div className={`flex my-4`}>
      <div className={`flex-none`}>
        <img src={project.logo} className={`w-28 h-28`}/>
      </div>
      <div className={`flex-grow flex flex-col ml-4`}>
        <h4 className={`font-semibold`}>{project.name}</h4>
        <span className={`text-gray-500`}>
          by {listContributors(project)}
        </span>
        <p>
          {project.summary}
        </p>
      </div>
    </div>

  </>
}

// function ProjectCard({ gameSlug, projectTypeSlug, project }: Props) {
//   let createdAt: Date = new Date(0);
//   createdAt.setUTCSeconds(project.createdAt);
//   let updatedAt = new Date(0);
//   updatedAt.setUTCSeconds(project.updatedAt);
//   return (
//     <div className={"h-24 my-2"}>
//       <div className="flex flex-row border border-darken-200 bg-darken-200">
//         <div className={"h-24 w-24 border-r border-darken-200 bg-darken-100 flex-none"}>
//           <Link href={`/games/${gameSlug}/${projectTypeSlug}/${project.slug}`}>
//             <a> <img className={"h-24 w-24"} src={project.logo}/></a>
//           </Link>
//         </div>
//         <div className={"w-3/4 border-darken-200 border-r flex flex-col"}>
//           <div>
//             <Link href={`/games/${gameSlug}/${projectTypeSlug}/${project.slug}`}>
//               <a className={"ml-2 hover:text-diluv-500 font-semibold text-lg transition-colors duration-100 ease-in flex-none"}>{project.name}</a>
//             </Link>
//           </div>
//           <div className={"ml-2"}>
//             <p>{project.summary}</p>
//           </div>
//           <div className={"border-t border-darken-200 mt-auto"}>
//             <div className={"flex flex-row text-sm"}>
//               <UserGroup className={"flex-none ml-2 my-auto mr-2 fill-current"} height={"15px"} width={"15px"}/>
//               {listContributors(project)}
//             </div>
//           </div>
//         </div>
//         <div className={"w-1/4 flex flex-col"}>
//           <div className={"pl-2 hover:bg-darken-100 py-1"}>
//             <div className={"flex flex-row"}>
//               <Chart className={"my-auto mr-1 fill-current"} height={"15px"} width={"15px"}/>
//               <p>{format(project.downloads)}</p>
//             </div>
//           </div>
//           <div className={"pl-2 hover:bg-darken-100 py-1"}>
//             <div className={"flex flex-row"}>
//               <HourGlass className={"my-auto mr-1 fill-current"} height={"15px"} width={"15px"}/>
//               <p>{createdAt.toLocaleDateString()}</p>
//             </div>
//           </div>
//           <div className={"pl-2 hover:bg-darken-100 py-1"}>
//             <div className={"flex flex-row"}>
//               <DateAdded className={"my-auto mr-1 fill-current"} height={"15px"} width={"15px"}/>
//               <p>{updatedAt.toLocaleDateString()}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// function ProjectCard({ gameSlug, projectTypeSlug, project }: Props) {
//   return (
//     <div className="flex border">
//       <div className={"w-1/12 my-auto mx-4"}>
//         <Link href={`/games/${gameSlug}/${projectTypeSlug}/${project.slug}`}>
//           <a className={""}>
//             <img className="w-full" title={project.name} src={project.logo}/>
//           </a>
//         </Link>
//       </div>
//
//       <div
//         className="w-11/12 border-gray-400 p-4 pt-3 ">
//         <div className="mb-2">
//           <a key={project.slug} href={`/games/${gameSlug}/${projectTypeSlug}/${project.slug}`}>
//             <div className=" hover:text-diluv-500 font-bold text-xl mb-1 transition-colors duration-100 ease-in">{project.name}</div>
//           </a>
//           <p className="text-base">{project.summary}</p>
//         </div>
//         <div className=" flex items-center">
//           <div className=" text-sm">
//             <p>
//               {`Created: ${new Date(project.createdAt).toLocaleString()}`}
//             </p>
//             <p>
//               {`Last Updated: ${ago(new Date(project.updatedAt))}`}
//             </p>
//             <p>
//               {`Downloads: ${project.downloads}`}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default ProjectCard;
