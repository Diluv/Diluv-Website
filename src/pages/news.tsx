import * as React from 'react'
import Layout from '../components/Layout'
import PostPreview from '../components/posts/PostPreview'
import {BlogPost} from "../interfaces/index";
import {NextPage} from 'next';

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

const NewsPage: NextPage = () => (
  <Layout title="News | Diluv">
    <h1>News</h1>
      {
	    (APIData.posts as BlogPost[]).map(PostPreview)
      }
	</Layout>
);

export default NewsPage