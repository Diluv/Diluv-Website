import React from 'react';
import filesize from 'filesize';
import { ProjectFiles } from '../../interfaces';

type Props = {
  projectFiles: ProjectFiles[]
};

function ProjectFilesComponent({ projectFiles }: Props) {
  return (
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
          projectFiles.map((projectFile) => (
            <tr key={`${projectFile.createdAt}:${projectFile.name}`}>
              <td className="border px-4 py-2">{projectFile.name}</td>
              <td className="border px-4 py-2">{new Date(projectFile.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">{filesize(projectFile.size)}</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">
                <button type="button">Download</button>
                <button type="button">
                  {/*<FontAwesomeIcon icon={faInfoCircle}/>*/}
                </button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default ProjectFilesComponent;
