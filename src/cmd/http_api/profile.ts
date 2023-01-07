import { Herror } from "../../pkg/herror/herror";
import { HerrorStatus } from "../../pkg/herror/status_codes";
import RouteHandler from "./types";

export const HandleUpdateProfile: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  const user_id: number = Number(req.context.user_id);
  const token: string = req.context.token;
  const bio: string = req.body.bio as string;
  let profile_buffer: Buffer | undefined = undefined;
  if (req.file && req.file.buffer) profile_buffer = req.file.buffer;

  const username: string = req.body.username;
  const interests: string = req.body.interests;

<<<<<<< HEAD
  console.log(user_id, token , bio , updated_at, username,profile_buffer);

  if (username != undefined) {
    const { responseStatus, profileData } =
      await app.profileManager.UpdateProfileDetails(
        user_id,
        username,
        updated_at,
        token,
        profile_buffer,
        bio,
        interests
      );
    app.SendRes(res, {
      status: responseStatus.statusCode,
      data: profileData,
      message: responseStatus.message,
    });
  } else {
    next(new Herror("BadRequest", HerrorStatus.StatusBadRequest));
  }
=======
  const { responseStatus, profileData } =
    await app.profileManager.UpdateProfileDetails(
      user_id,
      username,
      token,
      profile_buffer,
      bio,
      interests
    );
  app.SendRes(res, {
    status: responseStatus.statusCode,
    data: profileData,
    message: responseStatus.message,
  });
>>>>>>> 07321f6d1ec2bb1e2fe7612ff718d5d018ab37b6
};

export const HandleGetUserPrimaryInfo: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  const user_id = Number(req.context.user_id);
  console.log(user_id);
  if (user_id != undefined) {
    const userProfile = await app.profileManager.GetUserPrimaryInfoById(
      user_id
    );
    app.SendRes(res, {
      status: HerrorStatus.StatusOK,
      data: userProfile,
    });
  } else {
    next(new Herror("BadRequest", HerrorStatus.StatusBadRequest));
  }
};

export const HandleGetUserProfileInfo: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  var username: string;
  username = req.query.username as string;
  const user_id = Number(req.context.user_id);
  const limit = Number(req.query.limit || 10);
  const offset = Number(req.query.offset || 0);
  if (user_id != undefined) {
    if (username === undefined) {
      const userProfile = await app.profileManager.GetUserProfileById(
        user_id,
        offset,
        limit
      );
      app.SendRes(res, {
        status: HerrorStatus.StatusOK,
        data: userProfile,
      });
    } else {
      const userProfile = await app.profileManager.GetUserByUsernameBulk(
        username,
        offset,
        limit
      );
      app.SendRes(res, {
        status: HerrorStatus.StatusOK,
        data: userProfile,
      });
    }
  } else {
    next(new Herror("BadRequest", HerrorStatus.StatusBadRequest));
  }
};

export const HandleGetUserPosts: RouteHandler = async (req, res, next, app) => {
  var username = req.query.username as string;
  console.log(username);
  const limit = Number(req.query.limit || 10);
  const offset = Number(req.query.offset || 0);
  const user_id = req.context.user_id;

  if (username === undefined) {
    const userProfile = await app.profileManager.GetUserPostsById(
      user_id,
      offset,
      limit
    );
    console.log(userProfile);
    return app.SendRes(res, {
      status: HerrorStatus.StatusOK,
      data: userProfile,
    });
  }
  const userProfile = await app.profileManager.GetUserPostsByUsername(
    username,
    offset,
    limit
  );
  app.SendRes(res, {
    status: HerrorStatus.StatusOK,
    data: userProfile,
  });
};

export const HandleGetUserStaredPosts: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  let username = req.query.username as string;
  const limit = Number(req.query.limit || 10);
  const offset = Number(req.query.offset || 0);
  const user_id = req.context.user_id;

  if (username === undefined) {
    const userProfile = await app.profileManager.GetStaredPostsById(
      user_id,
      offset,
      limit
    );
    console.log(userProfile);
    app.SendRes(res, {
      status: HerrorStatus.StatusOK,
      data: userProfile,
    });
    return;
  }
  const userProfile = await app.profileManager.GetStaredPostsByUsername(
    username,
    offset,
    limit
  );
  app.SendRes(res, {
    status: HerrorStatus.StatusOK,
    data: userProfile,
  });
};

export const HandleGetCheckUsername: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  const username = req.body.username;
  if (username != undefined) {
    try {
      const { responseStatus } = await app.profileManager.CheckUsername(
        username
      );
      app.SendRes(res, {
        status: responseStatus.statusCode,
        message: responseStatus.message,
      });
    } catch (err) {
      next(err);
    }
  } else {
    next(new Herror("BadRequest", HerrorStatus.StatusBadRequest));
  }
};

export const HandleGetLeaderBoard: RouteHandler = async (
  req,
  res,
  next,
  app
) => {
  const limit = Number(req.query.limit ?? 10);
  const offset = Number(req.query.offset ?? 0);
  try {
    const { responseStatus, leaderBoard } =
      await app.profileManager.GetCommunityLeaderBoard(limit, offset);
    app.SendRes(res, {
      status: responseStatus.statusCode,
      message: responseStatus.message,
      data: leaderBoard,
    });
  } catch (err) {
    next(err);
  }
};
