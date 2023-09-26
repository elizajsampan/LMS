package org.ssglobal.project.codes.lms.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.ssglobal.project.codes.lms.models.tables.pojos.Posts;
import org.ssglobal.project.codes.lms.models.tables.pojos.Users;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;
import org.ssglobal.project.codes.lms.service.PostsService;
import org.ssglobal.project.codes.lms.service.UsersService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostsController {

    @Autowired
    private PostsService postsService;

    @Autowired
    private UsersService usersService;

    @PostMapping(value="/posts/new", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity insertPost(@RequestParam("post") String postStr,
                                     @RequestParam(value="image", required = false) MultipartFile image)
            throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper mapper = new ObjectMapper();
        Posts post = mapper.readValue(postStr, Posts.class);
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        post.setUserId(currentUser.getUserId());
        if(post.getPostContent() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(postsService.insertPost(post, image),
                HttpStatus.CREATED);
    }

    @PatchMapping(value="/posts/{postId}", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity editPost(@PathVariable String postId,
                                   @RequestParam("post") String postStr,
                                   @RequestParam("image") MultipartFile image)
            throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper mapper = new ObjectMapper();
        Posts post = mapper.readValue(postStr, Posts.class);
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        if (post.getPostContent() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(postsService.updatePost(currentUser.getUserId(), postId, post, image), HttpStatus.OK);
    }

    @DeleteMapping("/posts/delete/{postId}")
    public ResponseEntity deletePost(@PathVariable String postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(postsService.deletePost(currentUser.getUserId(), postId), HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity getPost(@PathVariable String postId) {
        return new ResponseEntity<>(postsService.getPostByPostId(postId), HttpStatus.OK);
    }

    @GetMapping("/post/me")
    public ResponseEntity getPostByUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(postsService.getPostByUserId(currentUser.getUserId()), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getUserImageByPostId(String postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(postsService.getUserImageByPostId(postId), HttpStatus.OK);
    }

    @GetMapping("/posts/info")
    public ResponseEntity getUserInfoByPostId(@RequestParam("postId") String postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(postsService.getUserInfoByPostId(postId), HttpStatus.OK);
    }

    @GetMapping("/posts/user")
    public ResponseEntity getPostsUsers() {
        return new ResponseEntity<>(postsService.getPostsUsers(), HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity getAllPosts() {
        return new ResponseEntity<>(postsService.getAllPosts(), HttpStatus.OK);
    }
}
