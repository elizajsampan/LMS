package org.ssglobal.project.codes.lms.service;

import org.jooq.*;
import org.jooq.Record;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.ssglobal.project.codes.lms.models.Tables;
import org.ssglobal.project.codes.lms.models.tables.pojos.Contents;
import org.ssglobal.project.codes.lms.models.tables.records.ContentsRecord;
import org.ssglobal.project.codes.lms.util.JSONConverter;

import java.util.List;

@Service
public class ContentsService {

    @Autowired
    private DSLContext context;
    @Autowired
    private JSONConverter jsonConverter;

    public String insertContent(Contents content) {

        try {
            context.insertInto(Tables.CONTENTS,
                            Tables.CONTENTS.CONTENT_ID,
                            Tables.CONTENTS.COURSE_ID,
                            Tables.CONTENTS.CONTENT_TITLE,
                            Tables.CONTENTS.VIDEO_CONTENT,
                            Tables.CONTENTS.LESSON_NUM,
                            Tables.CONTENTS.IS_FINISHED)
                    .values(content.getContentId(),
                            content.getCourseId(),
                            content.getContentTitle(),
                            content.getVideoContent(),
                            content.getLessonNum(),
                            content.getIsFinished())
                    .execute();
            return jsonConverter.convertRecordToJSON(context.selectFrom(Tables.CONTENTS).where(Tables.CONTENTS.CONTENT_ID
                    .eq(content.getContentId())).fetchOne());
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String updateContent(String contentId, Contents content) {
        try {
            context.update(Tables.CONTENTS)
                    .set(Tables.CONTENTS.CONTENT_TITLE, content.getContentTitle())
                    .set(Tables.CONTENTS.LESSON_NUM, content.getLessonNum())
                    .set(Tables.CONTENTS.VIDEO_CONTENT,
                            content.getVideoContent())
                    .set(Tables.CONTENTS.COURSE_ID, content.getCourseId()).set(Tables.CONTENTS.CONTENT_ID, contentId)
                    .where(Tables.CONTENTS.CONTENT_ID.eq(content.getContentId()))
                    .execute();
            return jsonConverter.convertRecordToJSON(context.selectFrom(Tables.CONTENTS).where(Tables.CONTENTS.CONTENT_ID
                    .eq(contentId)).fetchOne());
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public boolean deleteContent(String contentId) {
        try {
            context.delete(Tables.CONTENTS)
                    .where(Tables.CONTENTS.CONTENT_ID.eq(contentId))
                    .execute();
            return true;
        } catch(Exception e){
            System.err.println(e.getMessage());
            return false;
        }
    }

    public List<Contents> getAllContent() {
        try {
            return context.selectFrom(Tables.CONTENTS).fetchInto(Contents.class);
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public String getContentsByContentId(String contentId) {
        try {
            Record result;
            result = context.selectFrom(Tables.CONTENTS)
                    .where(Tables.CONTENTS.CONTENT_ID.eq(contentId))
                    .fetchOne();
            return jsonConverter.convertRecordToJSON(result);
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public Result<Record1<String>> getVideoPerContentName(String contentTitle) {
        try {
            return context.select(Tables.CONTENTS.VIDEO_CONTENT).from(Tables.CONTENTS)
                    .where(Tables.CONTENTS.CONTENT_TITLE.eq(contentTitle))
                    .fetch();
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }

    public Result<Record1<String>> getVideoPerLesson(Integer lessonNum, String contentTitle) {
        try {
            return context.select(Tables.CONTENTS.VIDEO_CONTENT).from(Tables.CONTENTS)
                    .where(Tables.CONTENTS.LESSON_NUM.eq(lessonNum).and(Tables.CONTENTS.CONTENT_TITLE.eq(contentTitle)))
                    .fetch();
        } catch(Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }


}
