package org.ssglobal.project.codes.lms.util;

import lombok.experimental.UtilityClass;
import org.jooq.JSONFormat;
import org.jooq.Record;
import org.jooq.Result;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JSONConverter {

    public String convertListOfRecordToJSON (List<Record> result){
        String jsonString = String.join("", "[", result.stream().map(e ->
                        e.formatJSON(
                                new JSONFormat().header(false).recordFormat(
                                        JSONFormat.RecordFormat.OBJECT)))
                .reduce("", (accumulated, input) -> {
                    accumulated = String.join(", ", accumulated, input
                    );
                    return accumulated;
                }), "]");
        if(result.toArray().length == 0){
            jsonString ="[ ]";
        }
        StringBuilder jsonSb = new StringBuilder();
        jsonSb.append(jsonString);
        jsonSb.deleteCharAt(1);
        String json = jsonSb.toString();
        return json;
    }

    public String convertRecordToJSON (Record result){
        String json = result.formatJSON(
                new JSONFormat().header(false).recordFormat(
                        JSONFormat.RecordFormat.OBJECT));
        return json;
    }

    public String convertResultToJSON (Result result){
        String json = result.formatJSON(
                new JSONFormat().header(false).recordFormat(
                        JSONFormat.RecordFormat.OBJECT));
        return json;
    }
}
