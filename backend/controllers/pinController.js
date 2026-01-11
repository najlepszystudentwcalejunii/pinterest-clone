import { isValidObjectId } from "mongoose";
import Pin from "../models/pinModel.js";

export const getPins = async (req, res) => {
  const LIMIT = 21;
  const pageNumber = Number(req.query.cursor);
  const search = req.query.search;
  const userId = req.query.userId;
  const boardId = req.query.boardId;

  const pins = await Pin.find(
    search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $in: search } },
          ],
        }
      : userId
      ? { user: userId }
      : boardId
      ? { board: boardId }
      : {}
  )
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);

  const hasNextPage = pins.length === LIMIT;

  res
    .status(200)
    .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
};

export const getOnePin = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.sendStatus(404);
  }

  const pin = await Pin.findById(id).populate(
    "user",
    "userName img displayName"
  );

  res.status(200).json(pin);
};
