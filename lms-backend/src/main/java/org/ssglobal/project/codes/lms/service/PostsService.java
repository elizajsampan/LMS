package org.ssglobal.project.codes.lms.service;

import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.ssglobal.project.codes.lms.models.Tables;
import org.ssglobal.project.codes.lms.models.tables.pojos.Posts;
import org.ssglobal.project.codes.lms.util.JSONConverter;

import java.util.List;

@Service
public class PostsService {

    @Autowired
    private DSLContext context;
    @Autowired
    private FileService fileService;
    @Autowired
    private JSONConverter jsonConverter;

    //write a post
    public String insertPost(Posts post, MultipartFile image) {

        try {
            context.insertInto(Tables.POSTS,
                            Tables.POSTS.POST_ID,
                            Tables.POSTS.USER_ID,
                            Tables.POSTS.POST_CONTENT, Tables.POSTS.POST_IMAGE)
                    .values(post.getPostId(),
                            post.getUserId(),
                            post.getPostContent(), fileService.upload(image))
                    .execute();
            return jsonConverter.convertRecordToJSON(
                    context.selectFrom(Tables.POSTS).where(Tables.POSTS.POST_ID
                            .eq(post.getPostId())).fetchOne());
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String updatePost(String userId, String postId, Posts post,
                             MultipartFile image) {
        if (image == null &&
                context.select(Tables.POSTS.POST_IMAGE).from(Tables.POSTS)
                        .where(Tables.POSTS.POST_ID.eq(postId)
                                .and(Tables.POSTS.USER_ID.eq(userId)))
                        .fetchOne() != null) {
            try {
                context.update(Tables.POSTS)
                        .set(Tables.POSTS.POST_CONTENT, post.getPostContent())
                        .setNull(Tables.POSTS.POST_IMAGE)
                        .where(Tables.POSTS.POST_ID.eq(postId)
                                .and(Tables.POSTS.USER_ID.eq(userId)))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.POSTS)
                                .where(Tables.POSTS.POST_ID
                                        .eq(post.getPostId())).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        } else if (image == null &&
                context.select(Tables.POSTS.POST_IMAGE).from(Tables.POSTS)
                        .where(Tables.POSTS.POST_ID.eq(postId)
                                .and(Tables.POSTS.USER_ID.eq(userId)))
                        .fetchOne() == null) {
            try {
                context.update(Tables.POSTS)
                        .set(Tables.POSTS.POST_CONTENT, post.getPostContent())
                        .where(Tables.POSTS.POST_ID.eq(postId)
                                .and(Tables.POSTS.USER_ID.eq(userId)))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.POSTS)
                                .where(Tables.POSTS.POST_ID
                                        .eq(post.getPostId())).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        } else {
            try {
                context.update(Tables.POSTS)
                        .set(Tables.POSTS.POST_CONTENT, post.getPostContent())
                        .set(Tables.POSTS.POST_IMAGE, fileService.upload(image))
                        .where(Tables.POSTS.POST_ID.eq(postId)
                                .and(Tables.POSTS.USER_ID.eq(userId)))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.POSTS)
                                .where(Tables.POSTS.POST_ID
                                        .eq(post.getPostId())).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        }
    }

    public boolean deletePost(String userId, String postId) {

        try {
            context.delete(Tables.POSTS)
                    .where(Tables.POSTS.POST_ID.eq(postId)
                            .and(Tables.POSTS.USER_ID.eq(userId)))
                    .execute();
            return true;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return false;
        }
    }

    public String getPostByPostId(String postId) {
        try {
            Record result;
            result = context.selectFrom(Tables.POSTS.leftJoin(Tables.USERS)
                            .on(Tables.POSTS.USER_ID.eq(Tables.USERS.USER_ID)))
                    .where(Tables.POSTS.POST_ID.eq(postId))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getPostByUserId(String userId) {
        try {
            Record result;
            result =
                    context.select(Tables.POSTS.POST_CONTENT).from(Tables.POSTS)
                            .where(Tables.POSTS.USER_ID.eq(userId))
                            .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getUsernameByPostId(String postId) {
        try {
            Record result;
            result = context.select(Tables.USERS.USERNAME)
                    .from(Tables.POSTS.innerJoin(Tables.POSTS)
                            .on(Tables.POSTS.USER_ID.eq(Tables.USERS.USER_ID))
                            .where(Tables.POSTS.USER_ID.eq(postId))).fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getUserImageByPostId(String postId) {
        try {
            Record result;
            result = context.select(Tables.USERS.IMAGE_URL)
                    .from(Tables.POSTS.innerJoin(Tables.USERS)
                            .on(Tables.POSTS.USER_ID.eq(Tables.USERS.USER_ID))
                            .where(Tables.POSTS.POST_ID.eq(postId)))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getUserInfoByPostId(String postId) {
        try {
            Record result;
            result = context.select(Tables.USERS.IMAGE_URL,
                            Tables.USERS.FIRST_NAME,
                            Tables.USERS.LAST_NAME, Tables.USERS.USERNAME)
                    .from(Tables.POSTS.innerJoin(Tables.USERS)
                            .on(Tables.POSTS.USER_ID.eq(Tables.USERS.USER_ID))
                            .where(Tables.POSTS.POST_ID.eq(postId)))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getPostsUsers() {

        try {
            Result result;
            result = context.selectFrom(Tables.POSTS.leftJoin(Tables.USERS)
                            .on(Tables.POSTS.USER_ID.eq(Tables.USERS.USER_ID)))
                    .fetch();
            return jsonConverter.convertListOfRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getFirstNameLastNameByPostId(String postId) {
        try {
            Record result;
            result = context.select(Tables.USERS.FIRST_NAME,
                            Tables.USERS.LAST_NAME)
                    .from(Tables.POSTS.innerJoin(Tables.POSTS)
                            .on(Tables.POSTS.USER_ID.eq(Tables.USERS.USER_ID))
                            .where(Tables.POSTS.USER_ID.eq(postId))).fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public List<Posts> getAllPosts() {
        try {
            return context.selectFrom(Tables.POSTS).fetchInto(Posts.class);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }
}
