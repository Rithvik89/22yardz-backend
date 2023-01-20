import { nextTick } from "process";
import { Herror } from "../../pkg/herror/herror";
import { HerrorStatus } from "../../pkg/herror/status_codes";
import RouteHandler from "./types";

export const HandleCreateComment: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  const user_id: number = Number(req.context.user_id);
  const content: string = String(req.body.content);
  const post_id: number = Number(req.body.post_id);

  if (post_id == undefined || post_id == null) {
    return next(new Herror("post id missing", HerrorStatus.StatusBadRequest));
  }

  try {
    const comment = await app.commentManager.Comment(
      BigInt(post_id),
      user_id,
      content
    );
    app.SendRes(res, { status: HerrorStatus.StatusOK, data: comment });
  } catch (err) {
    next(err);
  }
};

export const HandleGetComments: RouteHandler = async (req, res, next, app) => {
  const post_id: bigint = BigInt(req.query.post_id as string);
  if (!post_id) {
    return next(new Herror("post id missing", HerrorStatus.StatusBadRequest));
  }
  if (req.query.only_count) {
    try {
      const comment_count = await app.commentManager.GetCommentsCount(post_id);
      app.SendRes(res, {
        status: HerrorStatus.StatusOK,
        data: { comment_count },
      });
    } catch (err) {
      next(err);
    }
  } else {
    const limit = Number(req.query.limit || 10);
    const offset = Number(req.query.offset || 0);
    try {
      const comments = await app.commentManager.GetCommentsForPost(
        post_id,
        limit,
        offset
      );
      app.SendRes(res, { status: HerrorStatus.StatusOK, data: comments });
    } catch (err) {
      next(err);
    }
  }
};

export const HandleDeleteComment: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  const user_id: number = Number(req.context.user_id);
  const post_id: bigint = BigInt(req.body.post_id);
  const comment_id: bigint = BigInt(req.body.comment_id);

  if (post_id == undefined || post_id == null) {
    return next(new Herror("post id missing", HerrorStatus.StatusBadRequest));
  }
  try {
    await app.commentManager.DeleteComment(post_id, user_id, comment_id);
    app.SendRes(res, {
      status: HerrorStatus.StatusOK,
      message: "comment_deleted_succesfully",
    });
  } catch (err) {
    next(err);
  }
};

export const HandleCommentReply: RouteHandler = async (req, res, next, app) => {
  const user_id: number = Number(req.context.user_id);
  const comment_id: bigint = BigInt(req.body.comment_id);
  const content: string = String(req.body.content);

  if (!comment_id) {
    return next(
      new Herror("comment id missing", HerrorStatus.StatusBadRequest)
    );
  }
  try {
    const reply = await app.commentManager.Reply(comment_id, user_id, content);
    app.SendRes(res, {
      status: HerrorStatus.StatusOK,
      data: reply,
      message: "replied_to_comment_succesfully",
    });
  } catch (err) {
    next(err);
  }
};

export const HandleDeleteCommentReply: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  const user_id: number = Number(req.context.user_id);
  const comment_id: bigint = BigInt(req.body.comment_id);
  const parent_comment_id: bigint = BigInt(req.body.parent_comment_id);

  if (
    comment_id == undefined ||
    comment_id == null ||
    parent_comment_id == undefined ||
    parent_comment_id == null
  ) {
    return next(
      new Herror(
        "comment_id | parent_comment_id missing",
        HerrorStatus.StatusBadRequest
      )
    );
  }
  try {
    await app.commentManager.DeleteReply(
      parent_comment_id,
      user_id,
      comment_id
    );
    app.SendRes(res, {
      status: HerrorStatus.StatusOK,
      message: "reply_deleted_succesfully",
    });
  } catch (err) {
    next(err);
  }
};
