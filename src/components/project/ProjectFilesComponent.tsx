import * as React from 'react'
import {ProjectFiles} from "../../interfaces";
import filesize from 'filesize';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'

type Props = {
  projectFiles: ProjectFiles[]
}

const ProjectFilesComponent: React.FunctionComponent<Props> = ({projectFiles}) =>
  (
    <div className="container mx-auto">
      <table className="table-auto w-full text-center">
        <thead>
        <tr>
          <th className="px-4 py-2">File Name</th>
          <th className="px-4 py-2">Date Uploaded</th>
          <th className="px-4 py-2">Size</th>
          <th className="px-4 py-2">Total Downloads</th>
          <th className="px-4 py-2">Download</th>
        </tr>
        </thead>
        <tbody>
        {
          projectFiles.map((projectFile, index) =>
            <tr key={index}>
              <td className="border px-4 py-2">{projectFile.name}</td>
              <td className="border px-4 py-2">{new Date(projectFile.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">{filesize(projectFile.size)}</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">
                <button>Download</button>
                <a href={"url"}><FontAwesomeIcon icon={faInfoCircle}/></a>
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );

export default ProjectFilesComponent
