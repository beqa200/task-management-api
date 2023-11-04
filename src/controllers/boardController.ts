import { Request, Response } from "express";
import Board from "../models/boardModel";

const getAllBoards = async (_req: Request, res: Response) => {
  const boards = await Board.find();
  res.status(200).json({ data: boards });
};

const createBoard = async (req: Request, res: Response) => {
  const { name, columns } = req.body;

  try {
    const newBoard = new Board({
      name,
      columns: columns.map((item: string) => {
        return { name: item };
      }),
    });
    await newBoard.save();
    res.status(201).json({
      message: "Boards successfuly created",
      data: newBoard,
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      error: err,
    });
  }
};

const editBoard = async (req: Request, res: Response) => {
  try {
    const board = await Board.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true },
      
    );

    res.status(201).json({
      message: "Boards successfuly edited",
      data: board,
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      error: err,
    });
  }
};

export { getAllBoards, createBoard, editBoard };
