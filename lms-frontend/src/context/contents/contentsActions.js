import ContentsActionTypes from "./contentsActionTypes";

export const addContent = (
  userData,
  id,
  value,
  photo,
  likedByCurrentUser,
  likesCount,
  commentsCount,
  comments
) => ({
  type: ContentsActionTypes.ADD_CONTENT,
  payload: {
    userData,
    id,
    value,
    photo,
    likedByCurrentUser,
    likesCount,
    commentsCount,
    comments,
  },
});

export const editContent = (id, updatedContent) => ({
  type: ContentsActionTypes.EDIT_CONTENT,
  payload: {
    id,
    updatedContent,
  },
});

export const deleteContentStart = (id) => ({
  type: ContentsActionTypes.DELETE_CONTENT_START,
  payload: id,
});

export const deleteContentFinish = () => ({
  type: ContentsActionTypes.DELETE_CONTENT_FINISH,
});

export const deleteContentCancel = () => ({
  type: ContentsActionTypes.DELETE_CONTENT_CANCEL,
});

export const setContents = (contents) => ({
  type: ContentsActionTypes.SET_CONTENTS,
  payload: contents,
});

export const setVideoContent = (lessonNum, contentId) => ({
  type: ContentsActionTypes.SET_VIDEO_CONTENT,
  payload: {
    lessonNum,
    contentId,
  },
});

export const setSelectedContent = (selectedContent) => ({
  type: ContentsActionTypes.SET_SELECTED_CONTENT,
  payload: selectedContent,
});

export const resetContents = () => ({
  type: ContentsActionTypes.RESET_CONTENTS,
});

export const resetSelectedContent = () => ({
  type: ContentsActionTypes.RESET_SELECTED_CONTENT,
});

export const resetFilteredContents = () => ({
  type: ContentsActionTypes.RESET_FILTERED_CONTENTS,
});
