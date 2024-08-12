package com.taskmanagementsystem.tms.utility;

import java.time.Duration;

public class SecondsStrategy implements TimeStrategy {
    @Override
    public String formatTime(Duration duration) {
        return duration.getSeconds() + " seconds remaining";
    }
}
