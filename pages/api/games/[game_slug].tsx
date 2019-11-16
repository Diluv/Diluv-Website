import {NextApiRequest, NextApiResponse} from "next"
import {Data, Game} from "../../../interfaces";

export default (_: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(games)
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message})
  }
}
export const games: Data<Game> = {
  data: {name: 'Minecraft', slug: 'minecraft', url: 'https://minecraft.net'},
};
