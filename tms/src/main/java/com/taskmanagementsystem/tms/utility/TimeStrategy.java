package com.taskmanagementsystem.tms.utility;

import java.time.Duration;

public interface TimeStrategy {
    String formatTime(Duration duration);
}
