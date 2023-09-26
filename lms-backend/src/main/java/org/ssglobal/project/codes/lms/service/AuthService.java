package org.ssglobal.project.codes.lms.service;

import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssglobal.project.codes.lms.models.Tables;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final DSLContext context;

    public UsersRecord findByUsername(String username) {
        return context.selectFrom(Tables.USERS)
                .where(Tables.USERS.USERNAME
                .eq(username))
                .fetchOne();
    }
}
