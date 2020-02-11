import * as React from 'react'
import {ProjectFiles} from "../../interfaces";
import filesize from 'filesize';

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
          <th className="px-4 py-2">SHA512</th>
        </tr>
        </thead>
        <tbody>
        {
          projectFiles.map(projectFile =>
            <tr key={projectFile.sha512 + "-" + projectFile.createdAt}>
              <td className="border px-4 py-2">{projectFile.name}</td>
              <td className="border px-4 py-2">{new Date(projectFile.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">{filesize(projectFile.size)}</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">
                <button>Download</button>
              </td>
              <td className="border px-4 py-2">
                {/*TODO Print in proper way hover?*/}
                {projectFile.sha512.substr(0, 10)}
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );

export default ProjectFilesComponent
