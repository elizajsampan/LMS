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
import org.ssglobal.project.codes.lms.models.tables.pojos.Users;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;
import org.ssglobal.project.codes.lms.service.UsersService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UsersController {

    private final String ADMIN = "admin";
    @Autowired
    private UsersService usersService;

    @PostMapping(value = "/register", consumes =
            {MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity insertUser(@RequestParam("users") String usersStr,
                                     @RequestParam(value = "image",
                                             required = false)
                                     MultipartFile image)
            throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Users users = mapper.readValue(usersStr, Users.class);
        if (usersService.existByEmail(users.getEmail()) ||
                usersService.existByUsername(users.getUsername())
                || users.getUsername() == null
                || users.getFirstName() == null
                || users.getLastName() == null
                || users.getPassword() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        System.out.println("Account Created");
        return new ResponseEntity<>(usersService.insertUser(users, image),
                HttpStatus.CREATED);

    }

    @GetMapping("/me")
    public ResponseEntity getUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser =
                usersService.selectUserByUsername(authentication.getName());
        return new ResponseEntity<>(
                usersService.getUserByUsername(currentUser.getUsername()),
                HttpStatus.OK);

    }

    @PatchMapping(value = "/editprofile", consumes =
            {MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity editProfile(@RequestParam("users") String usersStr,
                                      @RequestParam(value = "image", required =
                                              false) MultipartFile image)
            throws JsonProcessingException {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper mapper = new ObjectMapper();
        Users users = mapper.readValue(usersStr, Users.class);
        UsersRecord currentUser =
                usersService.selectUserByUsername(authentication.getName());
//        users.setUserId(currentUser.getUserId());
//        users.setPassword(currentUser.getPassword());
        if (users.getUsername() == null ||
                users.getFirstName() == null ||
                users.getLastName() == null ||
                users.getEmail() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            System.out.println("Account Updated");
            return new ResponseEntity<>(
                    usersService.updateUser(currentUser.getUserId(), users,
                            image), HttpStatus.OK);
        }
    }

    @PatchMapping("/editpassword")
    public ResponseEntity editPassword(@RequestBody Users users) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser =
                usersService.selectUserByUsername(authentication.getName());
//        users.setPassword(users.getPassword());
        usersService.updateUserPassword(currentUser.getUserId(), users);
        System.out.println("Password Updated");
        return new ResponseEntity<>(currentUser.getUserId(), HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity getAllUsers() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser =
                usersService.selectUserByUsername(authentication.getName());
        if (currentUser.getRole().equals(ADMIN)) {
            return new ResponseEntity<>(usersService.getAllUsers(),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/user/delete/{userId}")
    public ResponseEntity deleteUser(@PathVariable String userId) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        UsersRecord currentUser =
                usersService.selectUserByUsername(authentication.getName());
        if (currentUser.getRole().equals(ADMIN)) {
            return new ResponseEntity<>(usersService.deleteUser(userId),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
