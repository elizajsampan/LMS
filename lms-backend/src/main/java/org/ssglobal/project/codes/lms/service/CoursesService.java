package org.ssglobal.project.codes.lms.service;

import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.ssglobal.project.codes.lms.models.Tables;
import org.ssglobal.project.codes.lms.models.tables.Contents;
import org.ssglobal.project.codes.lms.models.tables.pojos.Courses;
import org.ssglobal.project.codes.lms.util.JSONConverter;

import java.util.List;

@Service
public class CoursesService {

    @Autowired
    private DSLContext context;
    @Autowired
    private JSONConverter jsonConverter;
    @Autowired
    private FileService fileService;

    public String insertCourse(Courses course, MultipartFile image) {

        try {
            context.insertInto(Tables.COURSES,
                            Tables.COURSES.COURSE_ID,
                            Tables.COURSES.COURSE_NAME,
                            Tables.COURSES.DESCRIPTION,
                            Tables.COURSES.IMAGE_URL)
                    .values(course.getCourseId(),
                            course.getCourseName(),
                            course.getDescription(),
                            fileService.upload(image))
                    .execute();
            return jsonConverter.convertRecordToJSON(
                    context.selectFrom(Tables.COURSES)
                            .where(Tables.COURSES.COURSE_ID
                                    .eq(course.getCourseId())).fetchOne());
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String updateCourse(String courseId, Courses course,
                               MultipartFile image) {
        if (image == null &&
                context.select(Tables.COURSES.IMAGE_URL).from(Tables.COURSES)
                        .where(Tables.COURSES.COURSE_ID.eq(
                                course.getCourseId())).fetchOne() != null) {
            try {
                context.update(Tables.COURSES)
                        .set(Tables.COURSES.COURSE_NAME, course.getCourseName())
                        .set(Tables.COURSES.DESCRIPTION,
                                course.getDescription())
                        .setNull(Tables.COURSES.IMAGE_URL)
                        .where(Tables.COURSES.COURSE_ID.eq(
                                course.getCourseId()))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.COURSES)
                                .where(Tables.COURSES.COURSE_ID
                                        .eq(courseId)).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        } else if (image == null &&
                context.select(Tables.COURSES.IMAGE_URL).from(Tables.COURSES)
                        .where(Tables.COURSES.COURSE_ID.eq(
                                course.getCourseId())).fetchOne() == null) {
            try {
                context.update(Tables.COURSES)
                        .set(Tables.COURSES.COURSE_NAME, course.getCourseName())
                        .set(Tables.COURSES.DESCRIPTION,
                                course.getDescription())
                        .set(Tables.COURSES.COURSE_ID, courseId)
                        .where(Tables.COURSES.COURSE_ID.eq(
                                course.getCourseId()))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.COURSES)
                                .where(Tables.COURSES.COURSE_ID
                                        .eq(courseId)).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        } else {
            try {
                context.update(Tables.COURSES)
                        .set(Tables.COURSES.COURSE_NAME, course.getCourseName())
                        .set(Tables.COURSES.DESCRIPTION,
                                course.getDescription())
                        .set(Tables.COURSES.COURSE_ID, courseId)
                        .set(Tables.COURSES.IMAGE_URL,
                                fileService.upload(image))
                        .where(Tables.COURSES.COURSE_ID.eq(
                                course.getCourseId()))
                        .execute();
                return jsonConverter.convertRecordToJSON(
                        context.selectFrom(Tables.COURSES)
                                .where(Tables.COURSES.COURSE_ID
                                        .eq(courseId)).fetchOne());
            } catch (Exception e) {
                System.err.println(e.getMessage());
                return null;
            }
        }
    }

    public boolean deleteCourse(String courseId) {

        try {
            context.delete(Tables.COURSES)
                    .where(Tables.COURSES.COURSE_ID.eq(courseId))
                    .execute();
            return true;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return false;
        }
    }

    public String getCourseByCourseId(String courseId) {
        try {
            Record result;
            result = context.selectFrom(Tables.COURSES)
                    .where(Tables.COURSES.COURSE_ID.eq(courseId))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public List<Courses> getAllCourses() {
        try {
            return context.selectFrom(Tables.COURSES).fetchInto(Courses.class);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

//    public Result getContentByCourseId(String courseId) {
//        try {
//            Result result;
//            result = context.select(Tables.COURSES.COURSE_NAME, Tables.CONTENTS.LESSON_NUM, Tables.CONTENTS.VIDEO_CONTENT)
//                    .from(Tables.COURSES.innerJoin(Tables.CONTENTS)
//                            .on(Tables.COURSES.CONTENT_ID.eq(Tables.CONTENT.CONTENT_ID)))
//                    .where(Tables.COURSES.COURSE_ID.eq(courseId))
//                    .fetch();
//            return result;
//
//        } catch(Exception e){
//            System.err.println(e.getMessage());
//            return null;
//        }
//    }

    public String getCourseContentByCourseId(String courseId) {
        List<Record> result =
                context.selectFrom(Tables.CONTENTS.innerJoin(Tables.COURSES).
                                on(Tables.COURSES.COURSE_ID.eq(
                                        Contents.CONTENTS.COURSE_ID))).
                        where(Tables.COURSES.COURSE_ID.eq(courseId)).fetch()
                        .sortAsc(Tables.CONTENTS.LESSON_NUM);
        try {
            return jsonConverter.convertListOfRecordToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getCourseContentByCourseName(String courseName) {
        try {
            return jsonConverter.convertListOfRecordToJSON(context.selectFrom(
                            Tables.COURSES.innerJoin(Tables.CONTENTS).
                                    on(Tables.COURSES.COURSE_ID.eq(
                                            Tables.CONTENTS.COURSE_ID)))
                    .where(Tables.COURSES.COURSE_NAME.eq(courseName))
                    .fetch());
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getCourseByCourseName(String courseName) {
        try {
            Result result;
            result = context.selectFrom(Tables.COURSES)
                    .where(Tables.COURSES.COURSE_NAME.likeIgnoreCase(
                            "%" + courseName + "%"))
                    .fetch();
            return jsonConverter.convertResultToJSON(result);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

//    public Result<Record3<String, Integer, String>> getCourseLessonVideo(String contentName) {
//        try {
//            return context.select(Tables.COURSES.COURSE_NAME,
//                    Tables.CONTENT.LESSON_NUM,
//                    Tables.CONTENT.VIDEO_URL)
//                    .from(Tables.COURSES.innerJoin(Tables.CONTENT)
//                    .on(Tables.COURSES.CONTENT_ID.eq(Tables.CONTENT.CONTENT_ID))
//                            .where(Tables.CONTENT.CONTENT_NAME.eq(contentName)))
//                    .fetch();
//        } catch(Exception e){
//            System.err.println(e.getMessage());
//            return null;
//        }
//    }

}
