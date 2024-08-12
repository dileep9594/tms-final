package com.taskmanagementsystem.tms.utility;

import java.time.Duration;

public class WeeksStrategy implements TimeStrategy {
    @Override
    public String formatTime(Duration duration) {
        long weeks = duration.toDays() / 7;
        return weeks + " weeks remaining";
    }
}

