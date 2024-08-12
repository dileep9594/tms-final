package com.taskmanagementsystem.tms.utility;

import java.time.Duration;

public class MonthsStrategy implements TimeStrategy {
    @Override
    public String formatTime(Duration duration) {
        long months = duration.toDays() / 30;
        return months + " months remaining";
    }
}
