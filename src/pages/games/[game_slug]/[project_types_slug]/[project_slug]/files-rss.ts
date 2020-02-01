import * as React from 'react'

import {NextPageContext} from 'next';
import * as RSS from '../../../../../utils/rss';
import {ServerResponse} from 'http';

import {
  getProjectByGameSlugAndProjectTypeSlugAndProjectSlug,
  getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug
} from "../../../../../utils/projects";

export default class Rss extends React.Component {
	
  static async getInitialProps({ res, query: {game_slug, project_types_slug, project_slug} }: NextPageContext) {
	
	const gameSlug = Array.isArray(game_slug) ? game_slug[0] : game_slug;
    const projectTypesSlug = Array.isArray(project_types_slug) ? project_types_slug[0] : project_types_slug;
    const projectSlug = Array.isArray(project_slug) ? project_slug[0] : project_slug;

    const project = await getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);

    if (project) {
	
	    const projectFiles = await getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);

        if (projectFiles) {
	
	        let channel : RSS.Channel = new RSS.Channel(project.name, projectSlug, RSS.escapeString(project.summary), "en");
	
	        let items : RSS.Item[] = projectFiles.map(file => {
		
		        return new RSS.Item(file.name, file.sha512, new Date(file.createdAt).toLocaleString(), RSS.escapeString(file.changelog));
	        });
	
	        RSS.populateFeed(res as ServerResponse, channel, items);
        }
    }
  }
}
