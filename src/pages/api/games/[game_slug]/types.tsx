import {NextApiRequest, NextApiResponse} from "next"
import {Data, ProjectType} from "../../../../interfaces";

export default (_: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(games)
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message})
  }
}

export const games: Data<ProjectType[]> = {
  data: [
    {name: "Mods", slug: "mods", gameSlug: "minecraft"},
    {name: "Resource Packs", slug: "resourcepacks", gameSlug: "minecraft"}
  ]
};
