import * as React from 'react';
import {NextPageContext} from 'next';
import * as RSS from '../utils/rss';
import {ServerResponse} from 'http';

// TODO replace this with an API call. https://api.diluv.com/v1/news?count=5
const APIData = {
	"posts": [{
			"title": "Example Message",
			"path": "example-message",
			"summary": "This is the starting text of an example post. This text should usually be truncated to fit a certain length that is not too long. 140 characters is a decent amount as it is what old twitter used. This is an example of what happens when you say too much in your summary.",
			"createdAt": "2020-01-31T05:11:17+1000",
			"updatedAt": "",
			"author": "DiluvTeam",
			"authorPath": "diluv-team"
		},
		{
			"title": "Strange Messages",
			"path": "strange-messages",
			"summary": "We've recieved multiple reports from users that stange messages have been seen on the news tab. This is normal and expected behavior.",
			"createdAt": "2020-01-28T05:11:17+1000",
			"updatedAt": "",
			"author": "Darkhax",
			"authorPath": "darkhax"
		},
		{
			"title": "What is a Diluv?",
			"path": "what-is-a-diluv",
			"summary": "Many users ask what a Diluv is. We have no idea, if you find out please let us know.",
			"createdAt": "2020-01-27T05:11:17+1000",
			"updatedAt": "",
			"author": "DiluvTeam",
			"authorPath": "diluv-team"
		}
	]
};


export default class Rss extends React.Component {
	
  static async getInitialProps({ res }: NextPageContext) {
	
	let channel : RSS.Channel = new RSS.Channel("Diluv News", "https://www.diluv.com/news", "Latest news about the Diluv platform!", "en");
	
	let items : RSS.Item[] = APIData.posts.map(post => {
		
		return new RSS.Item(RSS.escapeString(post.title), post.path, post.createdAt, RSS.escapeString(post.summary));
	});
	
	RSS.populateFeed(res as ServerResponse, channel, items);
  }
}
