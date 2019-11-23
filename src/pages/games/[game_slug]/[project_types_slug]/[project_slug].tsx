import * as React from 'react'
import {NextPage} from 'next'
import Layout from '../../../../components/Layout'
import {Project} from "../../../../interfaces";
import {getProjectByGameSlugAndProjectTypeSlugAndProjectSlug} from "../../../../utils/projects";
import ProjectComponent from '../../../../components/project/ProjectComponent'

type Props = {
  project?: Project
  errors?: string
}

const ProjectOverviewPage: NextPage<Props> = ({project, errors}) => (

  <Layout title={(project ? project.name : '') + " | Diluv"}>
    {(project && (
      <ProjectComponent activeKey={'overview'} project={project}/>
    ))}
    {errors}
  </Layout>
);

ProjectOverviewPage.getInitialProps = async ({query: {game_slug, project_types_slug, project_slug}}) => {
  try {
    if (typeof game_slug == "string" && typeof project_types_slug == "string" && typeof project_slug == "string") {
      const project = await getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(game_slug, project_types_slug, project_slug);
      return {project};
    }
    return {errors: 'Invalid slug'}
  } catch (err) {
    return {errors: err.message}
  }
};

export default ProjectOverviewPage
