package org.ssglobal.project.codes.lms.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.ssglobal.project.codes.lms.models.tables.pojos.Users;
import org.ssglobal.project.codes.lms.models.Tables;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;
import org.ssglobal.project.codes.lms.util.JSONConverter;

import javax.annotation.Nullable;
import java.util.List;

@Service
public class UsersService {

    @Autowired
    private DSLContext context;
    @Autowired
    private FileService fileService;
    @Autowired
    private JSONConverter jsonConverter;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //insert new user (Register
    public String insertUser(Users user, MultipartFile image) {
        try {
            context.insertInto(Tables.USERS,
                            Tables.USERS.USER_ID,
                            Tables.USERS.USERNAME,
                            Tables.USERS.PASSWORD,
                            Tables.USERS.FIRST_NAME,
                            Tables.USERS.LAST_NAME,
                            Tables.USERS.EMAIL,
                            Tables.USERS.ROLE, Tables.USERS.IMAGE_URL)
                    .values(user.getUserId(),
                            user.getUsername(),
                            passwordEncoder.encode(user.getPassword()),
                            user.getFirstName(),
                            user.getLastName(),
                            user.getEmail(),
                            user.getRole(), fileService.upload(image))
                    .execute();
            return jsonConverter.convertRecordToJSON(
                    context.selectFrom(Tables.USERS).where(Tables.USERS.USER_ID
                            .eq(user.getUserId())).fetchOne());
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String updateUser(String userId, Users user, MultipartFile image) {
        if (image == null &&
                context.select(Tables.USERS.IMAGE_URL).from(Tables.USERS)
                        .where(Tables.USERS.USER_ID
                                .eq(userId)).fetchOne() != null) {
            try {
                context.update(Tables.USERS)
                        .set(Tables.USERS.FIRST_NAME, user.getFirstName())
                        .set(Tables.USERS.LAST_NAME, user.getLastName())
                        .set(Tables.USERS.USERNAME, user.getUsername())
                        .set(Tables.USERS.EMAIL, user.getEmail())
                        .setNull(Tables.USERS.IMAGE_URL)
                        .where(Tables.USERS.USER_ID.eq(userId))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.USERS)
                                .where(Tables.USERS.USER_ID
                                        .eq(userId)).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        } else if (image == null &&
                context.select(Tables.USERS.IMAGE_URL).from(Tables.USERS)
                        .where(Tables.USERS.USER_ID
                                .eq(userId)).fetchOne() == null) {
            try {
                context.update(Tables.USERS)
                        .set(Tables.USERS.FIRST_NAME, user.getFirstName())
                        .set(Tables.USERS.LAST_NAME, user.getLastName())
                        .set(Tables.USERS.USERNAME, user.getUsername())
                        .set(Tables.USERS.EMAIL, user.getEmail())
                        .where(Tables.USERS.USER_ID.eq(userId))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.USERS)
                                .where(Tables.USERS.USER_ID
                                        .eq(userId)).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        } else {
            try {
                context.update(Tables.USERS)
                        .set(Tables.USERS.FIRST_NAME, user.getFirstName())
                        .set(Tables.USERS.LAST_NAME, user.getLastName())
                        .set(Tables.USERS.USERNAME, user.getUsername())
                        .set(Tables.USERS.EMAIL, user.getEmail())
                        .set(Tables.USERS.IMAGE_URL, fileService.upload(image))
                        .where(Tables.USERS.USER_ID.eq(userId))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.USERS)
                                .where(Tables.USERS.USER_ID
                                        .eq(userId)).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        }
    }

    public String updateUserPassword(String userId, Users user) {

        try {
            context.update(Tables.USERS)
                    .set(Tables.USERS.PASSWORD,
                            passwordEncoder.encode(user.getPassword()))
                    .where(Tables.USERS.USER_ID.eq(userId))
                    .execute();
            return jsonConverter.convertRecordToJSON(
                    context.selectFrom(Tables.USERS).where(Tables.USERS.USER_ID
                            .eq(userId)).fetchOne());
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public boolean deleteUser(String userId) {

        try {
            context.delete(Tables.USERS)
                    .where(Tables.USERS.USER_ID.eq(userId))
                    .execute();
            return true;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return false;
        }
    }

    public String getAllUsers() {
        try {
            return jsonConverter.convertResultToJSON(
                    context.selectFrom(Tables.USERS).fetch());
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getUserById(Integer id) {

        try {
            Record result;
            result = context.selectFrom(Tables.USERS)
                    .where(Tables.USERS.ID.eq(id))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getUserByUserId(String userId) {

        try {
            Record result;
            result = context.selectFrom(Tables.USERS)
                    .where(Tables.USERS.USER_ID.eq(userId))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getUserByUsername(String username) {
        try {
            Record result;
            result = context.selectFrom(Tables.USERS)
                    .where(Tables.USERS.USERNAME.eq(username))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public UsersRecord selectUserByUsername(String username) {
        try {
            UsersRecord user = new UsersRecord();
            user = context.selectFrom(Tables.USERS)
                    .where(Tables.USERS.USERNAME.eq(username))
                    .fetchOne();
            return user;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getUserByUsernamePassword(String username, String password) {
        try {
            Record result;
            result = context.selectFrom(Tables.USERS)
                    .where(Tables.USERS.USERNAME.eq(username))
                    .and(Tables.USERS.PASSWORD.eq(password))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public Boolean existByUsername(String username) {
        try {
            return context.fetchExists(context.selectOne()
                    .from(Tables.USERS)
                    .where(Tables.USERS.USERNAME.eq(username)));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return false;
        }
    }

    public Boolean existByEmail(String email) {
        try {
            return context.fetchExists(context.selectOne()
                    .from(Tables.USERS)
                    .where(Tables.USERS.EMAIL.eq(email)));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return false;
        }
    }

}
