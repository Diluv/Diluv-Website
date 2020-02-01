import Link from 'next/link'

import {truncate} from "../../utils/text";
import {BlogPost} from "../../interfaces/index";


const PostPreview = (post: BlogPost) => (

  <div>
    <h2>
      <Link href={post.path}>
        <a>{post.title}</a>
      </Link>
    </h2>
    <a>{post.author + " | " +post.createdAt}</a>
    <hr/>
    <p>
      {truncate(post.summary, 140)}
    </p>
  </div>
)

export default PostPreview;