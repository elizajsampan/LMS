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
import org.ssglobal.project.codes.lms.models.tables.pojos.Contents;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;
import org.ssglobal.project.codes.lms.service.ContentsService;
import org.ssglobal.project.codes.lms.service.UsersService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ContentsController {

    @Autowired
    private ContentsService contentService;

    @Autowired
    private UsersService usersService;

    private final String ADMIN = "admin";

    @PostMapping(value="/content/add", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity insertContent(@RequestParam("content") String contentStr)
            throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper mapper = new ObjectMapper();
        Contents content = mapper.readValue(contentStr, Contents.class);
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        if(currentUser.getRole().equals(ADMIN)) {
            return new ResponseEntity<>(contentService.insertContent(content), HttpStatus.CREATED);
        } else if (content.getContentId() == null ||
                content.getCourseId() == null ||
                content.getContentTitle() == null ||
                content.getLessonNum() == null ||
            content.getVideoContent() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @PatchMapping(value="/content/{contentId}", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity updateContent(@PathVariable String contentId,
                                @RequestParam("content") String contentStr)
            throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper mapper = new ObjectMapper();
        Contents content = mapper.readValue(contentStr, Contents.class);
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        currentUser.getRole();
        if(currentUser.getRole().equals(ADMIN)) {
            return new ResponseEntity<>(contentService.updateContent(contentId, content), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/content/delete/{contentId}")
    public ResponseEntity deleteContent(@PathVariable String contentId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        if(currentUser.getRole().equals(ADMIN)) {
            return new ResponseEntity<>(contentService.deleteContent(contentId), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/content")
    public ResponseEntity getContent() {

        return new ResponseEntity<>(contentService.getAllContent(), HttpStatus.OK);
    }

    @GetMapping("/content/{contentId}")
    public ResponseEntity getContentByContentId(@PathVariable String contentId) {
        return new ResponseEntity<>(contentService.getContentsByContentId(contentId), HttpStatus.OK);
    }

    @GetMapping("/content/video/{contentName}")
    public ResponseEntity getVideosByContentName(@PathVariable String contentName) {
        return new ResponseEntity<>(contentService.getVideoPerContentName(contentName), HttpStatus.OK);
    }
    @GetMapping("/content/lesson/{lessonNum}")
    public ResponseEntity getVideoPerLesson(@PathVariable Integer lessonNum, String contentTitle) {
        return new ResponseEntity<>(contentService.getVideoPerLesson(lessonNum, contentTitle), HttpStatus.OK);
    }
}
