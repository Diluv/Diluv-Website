import * as React from 'react'
import {Button, Table} from 'react-bootstrap';
import {ProjectFiles} from "../../interfaces";
import filesize from 'filesize';

type Props = {
  projectFiles: ProjectFiles[]
}

const ProjectFilesComponent: React.FunctionComponent<Props> = ({projectFiles}) =>
  (
    <div className="container pt-md-3">
      <div>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>File Name</th>
            <th>Date Uploaded</th>
            <th>Size</th>
            <th>Total Downloads</th>
            <th>Download</th>
            <th>SHA512</th>
          </tr>
          </thead>
          <tbody>
          {
            projectFiles.map(value =>
              <tr key={value.sha512 + "-" + value.createdAt}>
                <td>{value.name}</td>
                <td>{new Date(value.createdAt).toLocaleString()}</td>
                <td>{filesize(value.size)}</td>
                <td>1</td>
                <td>
                  <Button variant="secondary">Download</Button>
                </td>
                <td>
                  {/*TODO Print in proper way*/}
                  {value.sha512.substr(0, 10)}
                </td>
              </tr>
            )
          }
          </tbody>
        </Table>
      </div>
    </div>
  );

export default ProjectFilesComponent
