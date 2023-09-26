package org.ssglobal.project.codes.lms.service;

import org.jooq.DSLContext;
import org.jooq.JSONFormat;
import org.jooq.Record;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ssglobal.project.codes.lms.models.Tables;
import org.ssglobal.project.codes.lms.models.tables.pojos.Comments;
import org.ssglobal.project.codes.lms.util.JSONConverter;

@Service
public class CommentsService {

    @Autowired
    private DSLContext context;
    @Autowired
    private JSONConverter jsonConverter;

    //write a comment
    public String insertComment(Comments comment) {
        try {
            context.insertInto(Tables.COMMENTS,
                            Tables.COMMENTS.COMMENT_ID,
                            Tables.COMMENTS.POST_ID,
                            Tables.COMMENTS.USER_ID,
                            Tables.COMMENTS.COMMENT_CONTENT)
                    .values(comment.getCommentId(),
                            comment.getPostId(),
                            comment.getUserId(),
                            comment.getCommentContent())
                    .execute();
            return jsonConverter.convertRecordToJSON(context.selectFrom(Tables.COMMENTS).where(Tables.COMMENTS.COMMENT_ID
                    .eq(comment.getCommentId())).fetchOne());
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String updateComment(String userId, String commentId,
                                Comments comment) {

        try {
            context.update(Tables.COMMENTS)
                    .set(Tables.COMMENTS.COMMENT_CONTENT, comment.getCommentContent())
                    .where(Tables.COMMENTS.COMMENT_ID.eq(commentId).and(Tables.POSTS.USER_ID.eq(userId)))
                    .execute();
            return jsonConverter.convertRecordToJSON(context.selectFrom(Tables.COMMENTS).where(Tables.COMMENTS.COMMENT_ID
                    .eq(comment.getCommentId())).fetchOne());
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public boolean deleteComment(String postId, String commentId, String userId) {

        try {
            context.delete(Tables.COMMENTS)
                    .where(Tables.COMMENTS.POST_ID.eq(postId)
                            .and(Tables.COMMENTS.COMMENT_ID.eq(commentId))
                            .and(Tables.COMMENTS.USER_ID.eq(userId)))
                    .execute();
            return true;
        } catch(Exception e){
            System.err.println(e.getMessage());
            return false;
        }
    }

    public String getAllCommentsByPostId(String postId) {
        try {
            Result result;
            result = context.selectFrom(Tables.COMMENTS.leftJoin(Tables.USERS)
                            .on(Tables.COMMENTS.USER_ID.eq(Tables.USERS.USER_ID)))
                    .where(Tables.COMMENTS.POST_ID.eq(postId))
                    .fetch();
            return jsonConverter.convertListOfRecordToJSON(result);
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getCommentByCommentId(String commentId) {

        try {
            Record result;
            result = context.select(Tables.COMMENTS.COMMENT_CONTENT).from(Tables.COMMENTS)
                    .where(Tables.COMMENTS.COMMENT_ID.eq(commentId))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

}
