import { isValidObjectId } from "mongoose";
import Pin from "../models/pinModel.js";
import Like from "../models/likeModel.js";
import Save from "../models/saveModel.js";
import sharp from "sharp";
import ImageKit from "imagekit";
import jwt from "jsonwebtoken";

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

export const createPin = async (req, res) => {
  const { title, description, link, board, tags, textOptions, canvasOptions } =
    req.body;

  const media = req.files.media;

  if (!title || !description || !media) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const parsedTextOptions = JSON.parse(textOptions || {});
  const parsedCanvasOptions = JSON.parse(canvasOptions || {});

  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width < metadata.height ? "portrait" : "landscape";
  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanvasOptions.size !== "original") {
    clientAspectRatio =
      parsedCanvasOptions.size.split(":")[0] /
      parsedCanvasOptions.size.split(":")[1];
  } else {
    parsedCanvasOptions.orientation === originalOrientation
      ? (clientAspectRatio = originalOrientation)
      : (clientAspectRatio = 1 / originalAspectRatio);
  }
  width = metadata.width;
  height = metadata.height / clientAspectRatio;

  const imagekit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    privateKey: process.env.IK_PRIVATE_KEY,
  });

  const textLeftPosition = Math.round((parsedTextOptions.left * width) / 375);
  const textTopPosition = Math.round(
    (parsedTextOptions.top * height) / parsedCanvasOptions.height
  );

  const transformationString = `w-${width},h-${height}${
    originalAspectRatio > clientAspectRatio ? ",cm-pad_resize" : ""
  },bg-${parsedCanvasOptions.backgroundColor.substring(1)}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${
          parsedTextOptions.fontSize * 2
        },lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(
          1
        )},l-end`
      : ""
  }`;

  imagekit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: "testingPins",
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {
      const newPin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board: board || null,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      });
      console.log(newPin);
      return res.status(201).json(newPin);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};

export const interactionCheck = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  const likeCount = (await Like.countDocuments({ pin: id })).valueOf();

  if (!token) {
    return res.status(200).json({ likeCount, isLiked: false, isSaved: false });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid" });
    }
    const userId = payload.userId;

    const isLiked = await Like.findOne({
      user: userId,
      pin: id,
    });

    const isSaved = await Save.findOne({
      user: userId,
      pin: id,
    });

    return res.status(200).json({
      likeCount,
      isLiked: isLiked ? true : false,
      isSaved: isSaved ? true : false,
    });
  });
};

export const interact = async (req, res) => {
  const { id } = req.params;

  const { type } = req.body;

  if (type === "like") {
    const isLiked = await Like.findOne({
      pin: id,
      user: req.userId,
    });
    if (isLiked) {
      console.log("delete");
      await Like.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else
      await Like.create({
        pin: id,
        user: req.userId,
      });
  }
  if (type === "save") {
    const isSaved = await Save.findOne({
      pin: id,
      user: req.userId,
    });
    if (isSaved)
      await Save.deleteOne({
        pin: id,
        user: req.userId,
      });
    else
      await Save.create({
        pin: id,
        user: req.userId,
      });
  }
  return res.status(200).json({ message: "Successful" });
};
