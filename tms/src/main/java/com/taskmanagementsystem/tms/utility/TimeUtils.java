package com.taskmanagementsystem.tms.utility;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class TimeUtils {
    private  final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public  String getRemainingTime(String dueDateTime) {
        try {
            LocalDateTime dueDate = LocalDateTime.parse(dueDateTime, FORMATTER);
            long dueDateEpochSeconds = dueDate.toEpochSecond(ZoneOffset.UTC);
            long currentEpochSeconds = LocalDateTime.now(ZoneOffset.UTC).toEpochSecond(ZoneOffset.UTC);
            long differenceInSeconds = dueDateEpochSeconds - currentEpochSeconds;

            return calculateRemainingTime(differenceInSeconds);
        } catch (DateTimeParseException e) {
            return "Invalid date format. Please use 'yyyy-MM-dd HH:mm:ss'.";
        }
    }

    private static String calculateRemainingTime(long seconds) {
        if (seconds < 60) {
            return seconds + " seconds";
        } else if (seconds < 3600) {
            return (seconds / 60) + " minutes";
        } else if (seconds < 86400) {
            return (seconds / 3600) + " hours";
        } else if (seconds < 604800) {
            return (seconds / 86400) + " days";
        } else if (seconds < 2592000) {
            return (seconds / 604800) + " weeks";
        } else {
            return (seconds / 2592000) + " months";
        }
    }
}
