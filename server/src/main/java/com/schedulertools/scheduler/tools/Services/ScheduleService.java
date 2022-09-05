package com.schedulertools.scheduler.tools.Services;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.schedulertools.scheduler.tools.Models.Form;
import com.schedulertools.scheduler.tools.Models.Schedule;

@Service
public class ScheduleService {

	public Schedule getSchedule(Form form) {
		Schedule schedule = new Schedule();
		calculate(schedule, form);
		plan(schedule, form);
		return schedule;
	}

	public void calculate(Schedule schedule, Form form) {
		// calculating Segment application rate 
		schedule.setSegmentApplicationRate((form.getEmitterFlow()/form.getEmitterSpacing())/form.getLateralSpacing());

		// calculating Lateral length
		schedule.setLateralLength(form.getSegmentLength()*form.getNodesInLateral());

		// calculating Segment flow
		schedule.setSegmentFlow((form.getEmitterFlow()/form.getEmitterSpacing())*form.getSegmentLength());

		// calculating Cycle time
		schedule.setCycleTime((form.getApplicationResolution()/schedule.getSegmentApplicationRate())*60);

		// calculating Node Irrigation times (cycles)
		schedule.setCycles(form.getIrrigationEventApplication()/form.getApplicationResolution());

		// calculating Event cycles
		schedule.setEventCycles((form.getEventTime()/schedule.getCycleTime())*60);
		
		// init active nodes
		schedule.setActiveNodes(new boolean[(int)schedule.getEventCycles()][(int)form.getNodesInLateral()]);
	}
	
	public void plan(Schedule schedule, Form form) {
		int numOfCycles = (int)schedule.getEventCycles();
		int numOfSegments = (int)form.getNodesInLateral();
		int cyclesForEachSegment = (int)schedule.getCycles();
		/* Generating a random cycle */
		Random r = new Random();
		int currentCycle = r.nextInt(numOfCycles) + 1;

		for(int i = 0; i < numOfSegments; i++) { //change to nodes.size()
			int finalCycle;
			finalCycle = activateNodes(schedule, i, currentCycle, numOfCycles-1, cyclesForEachSegment, isValid(currentCycle, cyclesForEachSegment, numOfCycles));
			currentCycle = finalCycle++;
		}
	}
	
	public int activateNodes(Schedule schedule, int segment, int firstCycle, int lastCycle, int cyclesNeeded, boolean isValid) {
		if(isValid) {
			int i = firstCycle;
			while(i < firstCycle + cyclesNeeded) {
				schedule.activateNode(i, segment);
				i++;
			}
			return i;
		}
		else {
			int i1 = firstCycle;
			int i2 = 0;
			int remaining = firstCycle + cyclesNeeded - (lastCycle) - 1;
			while(i1 <= lastCycle) {
				schedule.activateNode(i1, segment);
				i1++;
			}
			while(i2 < remaining) {
				schedule.activateNode(i2, segment);
				i2++;
			}
			return remaining;
		}
	}
	
	private boolean isValid(int startCycle, int cyclesNeeded, int numOfCycles) {
		if(startCycle + cyclesNeeded > numOfCycles)
			return false;
		return true;
	}
}
