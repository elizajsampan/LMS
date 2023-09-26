package org.ssglobal.project.codes.lms.service;

import org.jooq.DSLContext;
import org.jooq.Record5;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ssglobal.project.codes.lms.models.Tables;
import org.ssglobal.project.codes.lms.models.tables.pojos.MyCourses;
import org.ssglobal.project.codes.lms.models.tables.records.MyCoursesRecord;
import org.ssglobal.project.codes.lms.util.JSONConverter;

@Service
public class MyCoursesService {

    @Autowired
    private DSLContext context;
    @Autowired
    private JSONConverter jsonConverter;

    public String insertMyCourses(MyCourses myCourse) {

        try {
            context.insertInto(Tables.MY_COURSES,
                            Tables.MY_COURSES.MY_COURSE_ID,
                            Tables.MY_COURSES.COURSE_ID,
                            Tables.MY_COURSES.USER_ID, Tables.MY_COURSES.IS_FINISHED)
                    .values(myCourse.getMyCourseId(),
                            myCourse.getCourseId(),
                            myCourse.getUserId(),
                            myCourse.getIsFinished())
                    .execute();
            return jsonConverter.convertRecordToJSON(context.selectFrom(Tables.MY_COURSES).where(Tables.MY_COURSES.COURSE_ID
                    .eq(myCourse.getCourseId())).fetchOne());
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String updateMyCourses(String userId, String myCourseId,
                                  MyCourses myCourse) {
        try {
            context.update(Tables.MY_COURSES)
                    .set(Tables.MY_COURSES.COURSE_ID, myCourse.getCourseId())
                    .where(Tables.MY_COURSES.MY_COURSE_ID.eq(myCourseId).and(Tables.USERS.USER_ID.eq(userId)))
                    .execute();
            return jsonConverter.convertRecordToJSON(context.selectFrom(Tables.MY_COURSES).where(Tables.MY_COURSES.COURSE_ID
                    .eq(myCourse.getCourseId())).fetchOne());
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public boolean removeMyCourse(String myCourseId, String userId) {
        try {
            context.delete(Tables.MY_COURSES )
                    .where(Tables.MY_COURSES.MY_COURSE_ID.eq(myCourseId).and(Tables.MY_COURSES.USER_ID.eq(userId)))
                    .execute();
            return true;
        } catch(Exception e){
            System.err.println(e.getMessage());
            return false;
        }
    }

    public boolean removeMyCourses(String userId) {
        try {
            context.delete(Tables.MY_COURSES )
                    .where(Tables.MY_COURSES.USER_ID.eq(userId))
                    .execute();
            return true;
        } catch(Exception e){
            System.err.println(e.getMessage());
            return false;
        }
    }

    public String getMyCourseByUserId(String userId) {
        try {
            return jsonConverter.convertResultToJSON(context.selectFrom(Tables.MY_COURSES)
                    .where(Tables.MY_COURSES.USER_ID.eq(userId))
                    .fetch());
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public Result<Record5<String, String, String, Integer, String>> getMyCourseContent(String userId) {
        try {
            return context.select(Tables.COURSES.COURSE_NAME, Tables.COURSES.DESCRIPTION,
                            Tables.CONTENTS.CONTENT_TITLE, Tables.CONTENTS.LESSON_NUM, Tables.CONTENTS.VIDEO_CONTENT)
                    .from(Tables.COURSES.innerJoin(Tables.CONTENTS)
                            .on(Tables.COURSES.COURSE_ID.eq(Tables.CONTENTS.COURSE_ID))
                            .innerJoin(Tables.MY_COURSES).on(Tables.MY_COURSES.COURSE_ID.eq(Tables.COURSES.COURSE_ID))
                            .where(Tables.COURSES.COURSE_ID.eq(Tables.MY_COURSES.COURSE_ID).and(Tables.MY_COURSES.USER_ID.eq(userId))))
                    .fetch();
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public Result<MyCoursesRecord> getMyCourseByMyCourseId(String myCourseId) {
        try {
            return context.selectFrom(Tables.MY_COURSES)
                    .where(Tables.MY_COURSES.MY_COURSE_ID.eq(myCourseId))
                    .fetch();
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public boolean isFinishedMyCourse(String courseId) {
        boolean isFinished = true;
        try {
            context.update(Tables.MY_COURSES)
                    .set(Tables.MY_COURSES.IS_FINISHED, isFinished)
                    .where(Tables.MY_COURSES.COURSE_ID.eq(courseId))
                    .execute();
            return true;
        } catch(Exception e){
            System.err.println(e.getMessage());
            return false;
        }
    }

}