TestCase('PageLogicTest', 
{
	setUp: function()
	{
		this.bucket1 = {id: 0, name: 'Bucket 1', hours: 0.0};
		this.bucket2 = {id: 1, name: 'Bucket 2', hours: 0.0};
		this.testBucketArray = [this.bucket1, this.bucket2];
	},
	
	tearDown: function()
	{
//		jstestdriver.console.log("JsTestDriver", "Tearing down.");
	},
	
	testAddMinutes: function()
	{
//		jstestdriver.console.log("Browser", "Adding 15 minutes to " + this.testBucketArray[0].name);
		addMinutes(this.testBucketArray[0], 15);
		assertEquals("This bucket should have 0.25 hours logged.", 0.25, this.testBucketArray[0].hours);
		
		addMinutes(this.testBucketArray[0], 30);
		assertEquals("This bucket should have 0.75 hours logged.", 0.75, this.testBucketArray[0].hours);
		
		addMinutes(this.testBucketArray[0], 60);
		assertEquals("This bucket should have 1.75 hours logged.", 1.75, this.testBucketArray[0].hours);
	},
	
	testAddHours: function()
	{
		addHours(this.testBucketArray[0], 1);
		assertEquals("This bucket should have 1 hour logged.", 1, this.testBucketArray[0].hours);
		
		addHours(this.testBucketArray[0], 2);
		assertEquals("This bucket should have 3 hours logged.", 3, this.testBucketArray[0].hours);
		
		addHours(this.testBucketArray[1], 4);
		assertEquals("This bucket should have 4 hours logged.", 4, this.testBucketArray[1].hours);
	},
	
	testSubtractHour: function()
	{
		subtractHour(this.testBucketArray[0]);
		assertEquals("This bucket should have 0 hours logged.", 0, this.testBucketArray[0].hours);
		
		this.testBucketArray[0].hours = 3;
		subtractHour(this.testBucketArray[0]);
		assertEquals("This bucket should have 2 hours logged.", 2, this.testBucketArray[0].hours);
	},
	
	testAddHalfHour: function()
	{
		addHalfHour(this.testBucketArray[0]);
		assertEquals("This bucket should have 0.5 hours logged.", 0.5, this.testBucketArray[0].hours);
		
		addHalfHour(this.testBucketArray[0]);
		assertEquals("This bucket should have 1 hour logged.", 1, this.testBucketArray[0].hours);
		
		addHalfHour(this.testBucketArray[0]);
		assertEquals("This bucket should have 1.5 hours logged.", 1.5, this.testBucketArray[0].hours);
		
		addHalfHour(this.testBucketArray[0]);
		assertEquals("This bucket should have 2 hours logged.", 2, this.testBucketArray[0].hours);
	},
	
	testSubtractHalfHour: function()
	{
		subtractHalfHour(this.testBucketArray[0]);
		assertEquals("This bucket should have 0 hours logged.", 0, this.testBucketArray[0].hours);
		
		this.testBucketArray[0].hours = 3;
		subtractHalfHour(this.testBucketArray[0]);
		assertEquals("This bucket should have 2.5 hours logged.", 2.5, this.testBucketArray[0].hours);
	},
	
	testAddFifteen: function()
	{
		addFifteen(this.testBucketArray[0]);
		assertEquals("This bucket should have 0.25 hours logged.", 0.25, this.testBucketArray[0].hours);
		
		addFifteen(this.testBucketArray[0]);
		assertEquals("This bucket should have 0.5 hours logged.", 0.5, this.testBucketArray[0].hours);
		
		addFifteen(this.testBucketArray[0]);
		assertEquals("This bucket should have 0.75 hours logged.", 0.75, this.testBucketArray[0].hours);
		
		addFifteen(this.testBucketArray[0]);
		assertEquals("This bucket should have 1 hour logged.", 1, this.testBucketArray[0].hours);
	},
	
	testSubtractFifteen: function()
	{
		subtractFifteen(this.testBucketArray[0]);
		assertEquals("This bucket should have 0 hours logged.", 0, this.testBucketArray[0].hours);
		
		this.testBucketArray[0].hours = 3;
		subtractFifteen(this.testBucketArray[0]);
		assertEquals("This bucket should have 2.75 hours logged.", 2.75, this.testBucketArray[0].hours);
	},
	
	testCalculateTime: function()
	{
		var startTime = "9:00AM";
		var endTime = "9:00AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0 hours logged.", 0, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:07AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0 hours logged.", 0, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:08AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0.25 hours logged.", 0.25, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:15AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0.25 hours logged.", 0.25, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:21AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0.25 hours logged.", 0.25, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:25AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0.5 hours logged.", 0.5, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:30AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0.5 hours logged.", 0.5, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:41AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0.75 hours logged.", 0.75, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:59AM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 1 hour logged.", 1, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "9:00AM";
		endTime = "9:07PM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 12 hours logged.", 12, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "12:00AM";
		endTime = "12:07PM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 12 hours logged.", 12, this.testBucketArray[0].hours);
		
		
		this.testBucketArray[0].hours = 0;
		startTime = "10:30PM";
		endTime = "11:20PM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 0.75 hours logged.", 0.75, this.testBucketArray[0].hours);
		
		this.testBucketArray[0].hours = 0;
		startTime = "10:30AM";
		endTime = "1:30PM";
		
		calculateTime(startTime, endTime, this.testBucketArray[0], 0);
		assertEquals("This bucket should have 3 hours logged.", 3, this.testBucketArray[0].hours);
	},
	
	testGetTime: function() 
	{
		var time = new Date(2013, 2, 22, 1, 0, 0, 0);
		var formattedTime = getTime(time);
		assertEquals("Should be 1:00AM", "1:00AM", formattedTime);
		
		time = new Date(2013, 2, 22, 11, 0, 0, 0);
		formattedTime = getTime(time);
		assertEquals("Should be 11:00AM", "11:00AM", formattedTime);
		
		time = new Date(2013, 2, 22, 12, 0, 0, 0);
		formattedTime = getTime(time);
		assertEquals("Should be 12:00PM", "12:00PM", formattedTime);
		
		time = new Date(2013, 2, 22, 0, 0, 0, 0);
		formattedTime = getTime(time);
		assertEquals("Should be 12:00AM", "12:00AM", formattedTime);
	}, 
	
	testUpdateTotal: function()
	{
		var totalTime = 0;
		var sign = "pos";
		var hours = 1;
		var updatedTime = updateTotal(hours, sign, totalTime);
		assertEquals("Should be 1 hour", 1, updatedTime);
		
		
		totalTime = 0.25
		sign = "pos";
		hours = 2.5;
		updatedTime = updateTotal(hours, sign, totalTime);
		assertEquals("Should be 2.75 hours", 2.75, updatedTime);
		
		
		totalTime = 2.25
		sign = "pos";
		hours = 0.75;
		updatedTime = updateTotal(hours, sign, totalTime);
		assertEquals("Should be 3 hours", 3, updatedTime);
		
		
		totalTime = 0.5
		sign = "neg";
		hours = 0.5;
		updatedTime = updateTotal(hours, sign, totalTime);
		assertEquals("Should be 0 hours", 0, updatedTime);
		
		
		totalTime = 2.25
		sign = "neg";
		hours = 0.75;
		updatedTime = updateTotal(hours, sign, totalTime);
		assertEquals("Should be 1.5 hours", 1.5, updatedTime);
	}
});