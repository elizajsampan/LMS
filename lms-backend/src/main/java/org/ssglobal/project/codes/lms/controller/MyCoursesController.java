package org.ssglobal.project.codes.lms.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.RequiredArgsConstructor;
import org.jooq.JSONFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.ssglobal.project.codes.lms.models.tables.pojos.MyCourses;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;
import org.ssglobal.project.codes.lms.service.MyCoursesService;
import org.ssglobal.project.codes.lms.service.UsersService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MyCoursesController {

    @Autowired
    private MyCoursesService myCoursesService;

    @Autowired
    private UsersService usersService;

    @PostMapping("/mycourses/enroll")
    public ResponseEntity enrollCourse(@RequestBody MyCourses myCourses) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        myCourses.setUserId(currentUser.getUserId());
        return new ResponseEntity<>(myCoursesService.insertMyCourses(myCourses), HttpStatus.CREATED);
    }

    @PatchMapping("/mycourses/{myCourseId}")
    public ResponseEntity updateMyCourses(@PathVariable String myCourseId, @RequestBody MyCourses myCourses) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(myCoursesService.updateMyCourses(currentUser.getUserId(), myCourseId, myCourses), HttpStatus.OK);
    }

    @DeleteMapping("/mycourses/remove/{myCourseId}")
    public ResponseEntity removeMyCourse(@PathVariable String myCourseId, MyCourses myCourses) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(myCoursesService.removeMyCourse(myCourseId, currentUser.getUserId()), HttpStatus.OK);
    }

    @DeleteMapping("/mycourses/remove")
    public ResponseEntity removeMyCourses(MyCourses myCourses) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(myCoursesService.removeMyCourses(currentUser.getUserId()), HttpStatus.OK);
    }

    @GetMapping("/mycourses")
    public ResponseEntity getMyCourses() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(myCoursesService.getMyCourseByUserId(currentUser.getUserId()), HttpStatus.OK);
    }

    @GetMapping("/mycourses/content")
    public ResponseEntity getMyCourseContent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser = usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(myCoursesService.getMyCourseContent(currentUser.getUserId()), HttpStatus.OK);
    }

}

