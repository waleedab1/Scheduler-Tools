package com.schedulertools.scheduler.tools.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schedulertools.scheduler.tools.Models.Form;
import com.schedulertools.scheduler.tools.Models.Schedule;
import com.schedulertools.scheduler.tools.Services.ScheduleService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ScheduleController {
	
	@Autowired
	private ScheduleService scheduler;
	
	@PostMapping(path="/schedule")
	public Schedule getSchedule(@RequestBody Form form) {
		return scheduler.getSchedule(form);
	}
	
	@RequestMapping(path="/schedule")
	public String getSchedule() {
		return "Hello World!";
	}
}
