import {ServerResponse} from 'http';

/**
 * General information about an RSS feed.
 */
export class Channel {
	
	/**
	 * The display name of the feed.
	 */
	title: string;
	
	/**
	 * A link to the home of the feed.
	 */
	link: string;
	
	/**
	 * A description of the feed's content.
	 */
	description: string;
	
	/**
	 * The language that the feed is written in.
	 */
	language: string;
	
	constructor(title: string, link: string, description: string, language: string) {
		
		this.title = title;
		this.link = link;
		this.description = description;
		this.language = language;
	}
}

/**
 * A post or entry in the RSS feed.
 */
export class Item {
	
	/**
	 * The title of the post or entry.
	 */
	title: string
	
    /**
	 * A link to the content of the entry.
	 */
	link: string
	
	/**
	 * The date the item was published.
	 */
	pubDate: string
	
	/**
	 * A description or summary of the entry.
	 */
	description: string
	
	constructor (title: string, link: string, pubDate: string, description: string) {
		
		this.title = title;
		this.link = link;
		this.pubDate = pubDate;
		this.description = description;
	}
	
	
    /**
     * Converts an item item a valid RSS XML string.
     * @param item The item to turn into a valid RSS XML string.
     */
    toRSSString(): string {
        return `<item>
        <title>${this.title}</title>
        <link>${this.link}</link>
        <pubDate>${this.pubDate}</pubDate>
        <description>
        <![CDATA[${this.description}]]>
        </description>
      </item>`;
    }
}

/**
 * Overrites the response object and populates it with the data for an XML RSS feed instead.
 * @param res The response object, generally taken from getInitialProps.
 * @param channel The channel information used to describe the feed.
 * @param items An array of items to include in the feed.
 */
export function populateFeed(res: ServerResponse, channel: Channel, items: Item[]): void {
	
	// Ensure the context actually exists.
	if (res) {
		
		// Set the content header to XML
		res.setHeader("Content-Type", "text/xml");
		
		// Create the RSS feed string and write it to the response.
		res.write(createFeed(channel, items));
		res.end();
	}
}

/**
 * Creates an RSS feed string from a channel and an array of channel items.
 * @param channel The channel information used to describe the feed.
 * @param items An array of items to include in the feed.
 */
export function createFeed(channel: Channel, items: Item[]): string {
	
  // The date of the latest item included in the channel.
  let lastUpdated: string = "";

  // A string containing the XML for all the channel items.
  let rssItems = "";

  items.forEach(item => {
	
	// Parse the date of the post and see if it is the latest.
    const postDate = Date.parse(item.pubDate);

    if (!lastUpdated || postDate > Date.parse(lastUpdated)) {
      lastUpdated = item.pubDate;
    }

    // Turn the item into an XML string and append it.
    rssItems += item.toRSSString();
  });

  return assembleRSS(channel, rssItems, lastUpdated);
}

/**
 * Assembles an RSS feed XML string using various inputs.
 * @param channel The channel information used to describe the feed.
 * @param rssItems The items in the channel as a premade string.
 * @param lastUpdated The date of the latest post in the channel.
 */
function assembleRSS(channel: Channel, rssItems: string, lastUpdated: string): string {
  return `<?xml version="1.0" ?>
<rss version="2.0">
  <channel>
    <title>${channel.title}</title>
    <link>${channel.link}</link>
    <description>${channel.description}</description>
    <language>${channel.language}</language>
    <copyright>Copyright Diluv 2016-${new Date().getFullYear()}</copyright>
    <lastBuildDate>${lastUpdated}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;
}

export function escapeString(input: string) : string {
	return (input
        .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;')
    );
}