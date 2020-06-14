import Layout from "../components/Layout";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function Feedback() {
    return <Layout title={"Feedback"}>
        <div className={`w-1/2 mx-auto my-4`}>


            <ReactMarkdown source={`## GitHub

The best way to provide feedback is through our GitHub page. Posting issues on our GitHub page will notify our team members, allow community members to contribute to conversations, and allows us to better track and sort feedback. Keep in mind that GitHub is a public platform and your feedback will not be private. Do not include personal information or information about your Diluv account on GitHub.

When using GitHub please use one of the provided issue templates. These templates allow us to better understand what you are saying. They also allow us to streamline the feedback process. If you're unsure about something in the template please leave it blank or use your best effort to provide that information.

[Image of the templates page]

## Discord

Discord is a messaging service for online communities. When posting to the Diluv discord community please be respectful of our community rules and guidelines. Do **NOT** use Discord to directly message team members or random community members about your feedback unless you have permission to do so. Discord is a public forum and the messages you send will be visible to everyone. Please do not post personal information or information about your Diluv account on Discord.`}/>
        </div>
    </Layout>;
}