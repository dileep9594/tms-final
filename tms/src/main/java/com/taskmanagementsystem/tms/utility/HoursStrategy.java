package com.taskmanagementsystem.tms.utility;

import java.time.Duration;

public class HoursStrategy implements TimeStrategy {
    @Override
    public String formatTime(Duration duration) {
        long hours = duration.toHours();
        return hours + " hours remaining";
    }
}
