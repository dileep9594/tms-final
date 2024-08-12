package com.taskmanagementsystem.tms.utility;

import java.time.Duration;

public class DaysStrategy implements TimeStrategy {
    @Override
    public String formatTime(Duration duration) {
        long days = duration.toDays();
        return days + " days remaining";
    }
}
