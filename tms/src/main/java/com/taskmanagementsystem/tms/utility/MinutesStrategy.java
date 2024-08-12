package com.taskmanagementsystem.tms.utility;

import java.time.Duration;

public class MinutesStrategy implements TimeStrategy {
    @Override
    public String formatTime(Duration duration) {
        long minutes = duration.toMinutes();
        return minutes + " minutes remaining";
    }
}
