package com.schedulertools.scheduler.tools.Models;

public class Schedule {
	private int id;
	private boolean[][] activeNodes;
	private double segmentApplicationRate;
	private double lateralLength;
	private double segmentFlow;
	private double cycleTime;
	private double cycles;
	private double eventCycles;
	
	public Schedule() {

	}
	
	public Schedule(int id, boolean[][] activeNodes, double segmentApplicationRate, double lateralLength,
			double segmentFlow, double cycleTime, double cycles, double eventCycles) {
		super();
		this.id = id;
		this.activeNodes = activeNodes;
		this.segmentApplicationRate = segmentApplicationRate;
		this.lateralLength = lateralLength;
		this.segmentFlow = segmentFlow;
		this.cycleTime = cycleTime;
		this.cycles = cycles;
		this.eventCycles = eventCycles;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean[][] getActiveNodes() {
		return activeNodes;
	}
	public void setActiveNodes(boolean[][] activeNodes) {
		this.activeNodes = activeNodes;
	}
	public double getSegmentApplicationRate() {
		return segmentApplicationRate;
	}
	public void setSegmentApplicationRate(double segmentApplicationRate) {
		this.segmentApplicationRate = segmentApplicationRate;
	}
	public double getLateralLength() {
		return lateralLength;
	}
	public void setLateralLength(double lateralLength) {
		this.lateralLength = lateralLength;
	}
	public double getSegmentFlow() {
		return segmentFlow;
	}
	public void setSegmentFlow(double segmentFlow) {
		this.segmentFlow = segmentFlow;
	}
	public double getCycleTime() {
		return cycleTime;
	}
	public void setCycleTime(double cycleTime) {
		this.cycleTime = cycleTime;
	}
	public double getCycles() {
		return cycles;
	}
	public void setCycles(double cycles) {
		this.cycles = cycles;
	}
	public double getEventCycles() {
		return eventCycles;
	}
	public void setEventCycles(double eventCycles) {
		this.eventCycles = eventCycles;
	}
	
	public void activateNode(int i, int j) {
		activeNodes[i][j] = true;
	}
}
