package com.schedulertools.scheduler.tools.Models;

public class Form {
	private double blockSize;
	private double eventTime;
	private double applicationResolution;
	private double emitterFlow;
	private double emitterSpacing;
	private double lateralSpacing;
	private double segmentLength;
	private double nodesInLateral;
	private double irrigationEventApplication;
	
	public Form(double blockSize, double eventTime, double applicationResolution, double emitterFlow,
			double emitterSpacing, double lateralSpacing, double segmentLength, double nodesInLateral) {
		super();
		this.blockSize = blockSize;
		this.eventTime = eventTime;
		this.applicationResolution = applicationResolution;
		this.emitterFlow = emitterFlow;
		this.emitterSpacing = emitterSpacing;
		this.lateralSpacing = lateralSpacing;
		this.segmentLength = segmentLength;
		this.nodesInLateral = nodesInLateral;
	}
	
	public double getBlockSize() {
		return blockSize;
	}
	public void setBlockSize(double blockSize) {
		this.blockSize = blockSize;
	}
	public double getEventTime() {
		return eventTime;
	}
	public void setEventTime(double eventTime) {
		this.eventTime = eventTime;
	}
	public double getApplicationResolution() {
		return applicationResolution;
	}
	public void setApplicationResolution(double applicationResolution) {
		this.applicationResolution = applicationResolution;
	}
	public double getEmitterFlow() {
		return emitterFlow;
	}
	public void setEmitterFlow(double emitterFlow) {
		this.emitterFlow = emitterFlow;
	}
	public double getEmitterSpacing() {
		return emitterSpacing;
	}
	public void setEmitterSpacing(double emitterSpacing) {
		this.emitterSpacing = emitterSpacing;
	}
	public double getLateralSpacing() {
		return lateralSpacing;
	}
	public void setLateralSpacing(double lateralSpacing) {
		this.lateralSpacing = lateralSpacing;
	}
	public double getSegmentLength() {
		return segmentLength;
	}
	public void setSegmentLength(double segmentLength) {
		this.segmentLength = segmentLength;
	}
	public double getNodesInLateral() {
		return nodesInLateral;
	}
	public void setNodesInLateral(double nodesInLateral) {
		this.nodesInLateral = nodesInLateral;
	}

	public double getIrrigationEventApplication() {
		return irrigationEventApplication;
	}

	public void setIrrigationEventApplication(double irrigationEventApplication) {
		this.irrigationEventApplication = irrigationEventApplication;
	}
	
	
}
