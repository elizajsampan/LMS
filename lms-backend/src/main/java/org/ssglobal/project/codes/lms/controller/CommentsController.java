package org.ssglobal.project.codes.lms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.ssglobal.project.codes.lms.models.tables.pojos.Comments;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;
import org.ssglobal.project.codes.lms.service.CommentsService;
import org.ssglobal.project.codes.lms.service.UsersService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @Autowired
    private UsersService usersService;

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity insertComment(@PathVariable String postId, @RequestBody Comments comment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        comment.setUserId(currentUser.getUserId());
        comment.setPostId(postId);
        if(comment.getCommentContent() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(commentsService.insertComment(comment), HttpStatus.CREATED);
        }
    }

    @PatchMapping("/comment/{commentId}")
    public ResponseEntity editComment(@PathVariable String commentId, @RequestBody Comments comment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        if (comment.getCommentContent() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(commentsService.updateComment(currentUser.getUserId(), commentId, comment), HttpStatus.OK);

    }

    @DeleteMapping("/posts/{postId}/comments/{commentId}")
    public ResponseEntity deletePost(@PathVariable String postId, @PathVariable String commentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(commentsService.deleteComment(postId, commentId, currentUser.getUserId()), HttpStatus.OK);
    }

    @GetMapping("/posts/comment/{commentId}")
    public ResponseEntity getComment(@PathVariable String commentId) {
        return new ResponseEntity<>(commentsService.getCommentByCommentId(commentId), HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity getAllCommentsInPost(@PathVariable String postId) {
        return new ResponseEntity<>(commentsService.getAllCommentsByPostId(postId), HttpStatus.OK);
    }
}
