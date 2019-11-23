import {NextApiRequest, NextApiResponse} from "next"
import {Data, Project} from "../../../../../interfaces";

export default (_: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(games)
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message})
  }
}
export const games: Data<Project> = {
  data: {
    name: "Bookshelf",
    slug: "bookshelf",
    summary: "Bookshelf summary",
    description: "Bookshelf description",
    logoUrl: "https://via.placeholder.com/64",
    cachedDownloads: 32923285,
    createdAt: 1573482394,
    updatedAt: 1573482394
  },
};
