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
import org.ssglobal.project.codes.lms.models.tables.pojos.Courses;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;
import org.ssglobal.project.codes.lms.service.CoursesService;
import org.ssglobal.project.codes.lms.service.UsersService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CoursesController {

    @Autowired
    private CoursesService coursesService;

    @Autowired
    private UsersService usersService;

    private final String ADMIN = "admin";

    @PostMapping(value="/courses/new", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity insertCourse(@RequestParam("course") String courseStr,
                                       @RequestParam(value="image", required
                                               = false) MultipartFile image)
            throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper mapper = new ObjectMapper();
        Courses course = mapper.readValue(courseStr, Courses.class);
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        if(currentUser.getRole().equals(ADMIN)) {
            return new ResponseEntity<>(coursesService.insertCourse(course,
                    image),
                    HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/courses/{courseId}")
    public ResponseEntity editCourse(@PathVariable String courseId,
                                     @RequestParam("course") String courseStr,
                                     @RequestParam(value="image", required = false) MultipartFile image)
            throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper mapper = new ObjectMapper();
        Courses course = mapper.readValue(courseStr, Courses.class);
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        if(currentUser.getRole().equals(ADMIN)) {
            return new ResponseEntity<>(coursesService.updateCourse(courseId,
                    course, image), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/courses/delete/{courseId}")
    public ResponseEntity deleteCourse(@PathVariable String courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        if(currentUser.getRole().equals(ADMIN)) {
            return new ResponseEntity<>(coursesService.deleteCourse(courseId), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/courses")
    public ResponseEntity getCourses() {
        return new ResponseEntity<>(coursesService.getAllCourses(), HttpStatus.OK);
    }

    @GetMapping("/courses/{courseName}")
    public ResponseEntity getCourseByCourseName(@PathVariable String courseName) {
        return new ResponseEntity<>(coursesService.getCourseByCourseName(courseName), HttpStatus.OK);
    }

    @GetMapping("/courses/id/{courseId}")
    public ResponseEntity getCourseByCourseId(@PathVariable String courseId) {
        return new ResponseEntity<>(coursesService.getCourseByCourseId(courseId), HttpStatus.OK);
    }

    @GetMapping("/courses/content/id/{courseId}")
    public ResponseEntity getCourseContentByCourseId(@PathVariable String courseId) {
        return new ResponseEntity<>(coursesService.getCourseContentByCourseId(courseId), HttpStatus.OK);
    }

    @GetMapping("/courses/content/{courseName}")
    public ResponseEntity getCourseContentByCourseName(@PathVariable String courseName) {
        return new ResponseEntity<>(coursesService.getCourseContentByCourseName(courseName), HttpStatus.OK);
    }

}
