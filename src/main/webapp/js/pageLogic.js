var bucketArray = new Array();

function addBucket()
{
	$('#bucketErrors').text("");
	$('#bucketErrors').hide();
	
	var index = bucketArray.length;
	var name = $('#bucketName').val();
	
	if(isValidName(name, null, bucketArray))
	{
		var hours = 0.0;
		var bucket = {'id': index, 'name': name, 'hours': hours};
		
		bucketArray.push(bucket);
	}
	else
	{
		$('#bucketErrors').text("The name you entered is already in the list.  Please enter a unique name.");
		$('#bucketErrors').show();
	}
}

function addBucketUI()
{
	$('#bucketListDiv').empty();
	$('#bucketListDiv').append('<div class="span12">' +
			'<span class="header span2">Bucket Name</span>' + 
			'<span class="header span2">Hours Accrued</span>' +
			'<span class="header span2">Hour</span>' +
			'<span class="header span2">Half Hour</span>' +
			'<span class="header span2">15 Minutes</span></div>');
	$('#bucketListDiv').append('<div class="span12"><ul class="noBullet" id="bucketList"></ul></div>');
	
	for(var i = 0; i < bucketArray.length; i++)
	{
		$('#bucketList').append(
				'<li>' + 
					'<span id="nameSpan' + i + '" class="span2 control-group">' + bucketArray[i].name + '</span>' +
					'<span id="hoursSpan' + i + '" class="span2">' + bucketArray[i].hours + '</span>' + 
					'<span class="span2">' + 
						'<span class="btn btn-small addHour" id="addHour' + i + '">' + 
							'<i class="icon-plus" id="iconAddHour' + i + '"></i>' + 
						'</span>' + 
						'<span class="btn btn-small subtractHour" id="subtractHour' + i + '">' + 
							'<i class="icon-minus" id="iconSubtractHour' + i + '"></i>' + 
						'</span>' +
					'</span>' +
					'<span class="span2">' + 
						'<span class="btn btn-small addHalfHour" id="addHalfHour' + i + '">' + 
							'<i class="icon-plus" id="iconAddHalfHour' + i + '"></i>' + 
						'</span>' + 
						'<span class="btn btn-small subtractHalfHour" id="subtractHalfHour' + i + '">' + 
							'<i class="icon-minus" id="iconSubtractHalfHour' + i + '"></i>' + 
						'</span>' +
					'</span>' +
					'<span class="span2">' + 
						'<span class="btn btn-small addFifteen" id="addFifteen' + i + '">' + 
							'<i class="icon-plus" id="iconAddFifteen' + i + '"></i>' + 
						'</span>' + 
						'<span class="btn btn-small subtractFifteen" id="subtractFifteen' + i + '">' + 
							'<i class="icon-minus" id="iconSubtractFifteen' + i + '"></i>' + 
						'</span>' +
					'</span>' +
					'<span class="span2" id="timeSpan' + i + '">' + 
						'<span id="startTime' + i + '">' +
							'<span id="startTimeSpan' + i + '" class="time">Not Started</span>' +
							'<input type="button" class="btn btn-small startTimeBtn" id="startTimeBtn' + i + '" value="Start" />' +
						'</span>' +
					'</span>' +
					'<span class="span2">' + 
						'<span id="renameSpan' + i + '">' + 
							'<input type="button" class="btn btn-small rename" id="rename' + i + '" value="Rename" />' + 
						'</span>' +
						'<span class="btn btn-small delete" id="delete' + i + '">' +
							'<i class="icon-trash" id="iconDelete' + i + '"></i>' +
						'</span>' +
					'</span>' +
				'</li>');
	}
	$('#timeDiv').show();
}

function addHour(bucket)
{
	addHours(bucket, 1);
}

function addHours(bucket, hours)
{
	bucket.hours = bucket.hours + hours;
	$('#hoursSpan' + bucket.id).text(bucket.hours);
}

function subtractHour(bucket)
{
	if(bucket.hours >= 1)
	{
		bucket.hours = bucket.hours - 1;
		$('#hoursSpan' + bucket.id).text(bucket.hours);
	}
}

function addHalfHour(bucket)
{
	bucket.hours = bucket.hours + 0.5;
	$('#hoursSpan' + bucket.id).text(bucket.hours);
}

function subtractHalfHour(bucket)
{
	if(bucket.hours >= 0.5)
	{
		bucket.hours = bucket.hours - 0.5;
		$('#hoursSpan' + bucket.id).text(bucket.hours);
	}
}

function addFifteen(bucket)
{
	bucket.hours = bucket.hours + 0.25;
	$('#hoursSpan' + bucket.id).text(bucket.hours);
}

function subtractFifteen(bucket)
{
	if(bucket.hours >= 0.25)
	{
		bucket.hours = bucket.hours - 0.25;
		$('#hoursSpan' + bucket.id).text(bucket.hours);
	}
}

function addMinutes(bucket, minutes)
{
	bucket.hours = bucket.hours + (minutes/60);
	$('#hoursSpan' + bucket.id).text(bucket.hours);
}

function startTime(bucket)
{
	var now = getTime();
	var bucketId = bucket.id;
	
	$('#timeSpan' + bucketId).html(
			'<span id="startTimeSpan' + bucketId + '" class="time">' + now + '</span>' +
			'<input type="button" class="btn btn-small endTimeBtn" id="endTimeBtn' + bucketId + '" value="End" />'
	);
}

function endTime(bucket)
{
	var now = getTime();
	var bucketId = bucket.id;
	var startTime = $('#startTimeSpan' + bucketId).text();
	
	$('#timeSpan' + bucketId).html(
			'<span id="startTimeSpan' + bucketId + '" class="time">' + startTime + '</span>' +
			'<span id="endTimeSpan' + bucketId + '" class="time">' + now + '</span>' +
			'<input type="button" class="btn btn-small startTimeBtn" id="startTimeBtn' + bucketId + '" value="Start" />'
	);
	
	calculateTime(startTime, now, bucket);
}

function allowNameEdit(bucket)
{
	var bucketId = bucket.id;
	
	$('#nameSpan' + bucketId).html('<input type="text" id="editNameText' + bucketId + '" class="input-small editName" value="' + bucket.name + '" />');
	$('#renameSpan' + bucketId).html('<input type="button" class="btn btn-small saveName" id="saveName' + bucketId + '" value="Save" />');
}

function rename(bucket, name, bucketArray)
{
	var bucketId = bucket.id;
	
	$('#listErrors').text("");
	$('#listErrors').hide();
	
	if(isValidName(name, bucket, bucketArray))
	{
		bucket.name = name;
		$('#nameSpan' + bucketId).text(bucket.name);
		$('#renameSpan' + bucketId).html('<input type="button" class="btn btn-small rename" id="rename' + bucketId + '" value="Rename" />');
	}
	else
	{
		$('#nameSpan').addClass("error")
		$('#listErrors').text("The name you entered is already in the list.  Please enter a unique name.");
		$('#listErrors').show();
	}
}

function deleteBucket(bucketArray, bucket)
{
	bucketArray.splice(bucketArray.indexOf[bucket], 1);
	addBucketUI();
}




////////////////////////////////////////////
//			   Helper Methods             //
////////////////////////////////////////////

function isValidName(name, bucket, bucketArray)
{
	if(bucket == null)
	{
		for(var i = 0; i < bucketArray.length; i++)
		{
			if(bucketArray[i].name == name)
			{
				return false;
			}
		}
	}
	else //allow renaming to the same name
	{
		var id = bucket.id;
		
		if(id != null)
		{
			for(var i = 0; i < bucketArray.length; i++)
			{
				if(bucketArray[i].name == name && i != id)
				{
					return false;
				}
			}
		}
	}
	
	return true;
}

function getTime()
{
	var now = new Date();
	var minutes = now.getMinutes();
	var hours = now.getHours();
	var ampm;
	
	if(minutes < 10)
	{
		minutes = "0" + minutes;
	}
	if(hours > 12)
	{
		ampm = "PM";
		hours -= 12;
	}
	else
	{
		ampm = "AM";
	}
	
	return hours + ':' + minutes + ampm;
}

function calculateTime(startTime, endTime, bucket)
{
	var endTimeAmPm = endTime.substring(endTime.indexOf("M") - 1);
	var startTimeAmPm = startTime.substring(startTime.indexOf("M") - 1);
	
	var endTimeHours = parseInt(endTime.substring(0, endTime.indexOf(':')));
	var startTimeHours = parseInt(startTime.substring(0, endTime.indexOf(':')));
	
	if(endTimeAmPm == "PM")
	{
		if(endTimeHours != 12)
		{
			endTimeHours += 12;
		}
	}
	else
	{
		if(endTimeHours == 12) //midnight
		{
			endTimeHours -= 12;
		}
	}
	if(startTimeAmPm == "PM")
	{
		if(startTimeHours != 12)
		{
			startTimeHours += 12;
		}
	}
	else
	{
		if(startTimeHours == 12) //midnight
		{
			startTimeHours -= 12;
		}
	}
	
	var hourDifference = endTimeHours - startTimeHours;
	
	var endTimeMinutes = parseInt(endTime.substring(endTime.indexOf(':') + 1, endTime.indexOf('M') - 1), 10);
	var startTimeMinutes = parseInt(startTime.substring(startTime.indexOf(':') + 1, startTime.indexOf('M') - 1), 10);
	var minuteDifference = endTimeMinutes - startTimeMinutes;
	
	if(minuteDifference < 0)
	{
		hourDifference--;
		minuteDifference += 60;
		
		if(hourDifference < 0)
		{
			//throw error
		}
	}
	
	if(hourDifference > 0)
	{
		addHours(bucket, hourDifference);
	}
	if(minuteDifference > 0)
	{
		var minutesLeftover = minuteDifference%15;
		
		if(minutesLeftover === 0)
		{
			addMinutes(bucket, minuteDifference);
		}
		else
		{
			//calculate number of 15 minute blocks
			var div = minuteDifference / 15;
			if(div > 1) //over 15 minutes
			{
				var fifteenMinuteBlocks = Math.floor(div);
				
				if(minutesLeftover >= 8)
				{
					fifteenMinuteBlocks++;
				}
				
				addMinutes(bucket, (15*fifteenMinuteBlocks));
			}
			else
			{
				if(minutesLeftover >= 8)  //round up if 8-14 minutes
				{
					addMinutes(bucket, 15);
				}
			}
		}
	}
}


////////////////////////////////////////////
//             Click events               //
////////////////////////////////////////////

$('#addBucket').click(function() 
{
	addBucket();
	addBucketUI();
	$('#bucketName').val('');
});

$('#bucketListDiv').on("click", ".addHour", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("r") + 1);
	addHour(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".subtractHour", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("r") + 1);
	subtractHour(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".addHalfHour", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("r") + 1);
	addHalfHour(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".subtractHalfHour", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("r") + 1);
	subtractHalfHour(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".addFifteen", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("n") + 1);
	addFifteen(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".subtractFifteen", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("n") + 1);
	subtractFifteen(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".startTimeBtn", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("n") + 1);
	
	startTime(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".endTimeBtn", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("n") + 1);

	endTime(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".rename", function(event) 
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("e") + 1);
	
	allowNameEdit(bucketArray[numId]);
});

$('#bucketListDiv').on("click", ".saveName", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("e") + 1);
	var name = $('#editNameText' + numId).val();
	
	rename(bucketArray[numId], name, bucketArray);
});

$('#bucketListDiv').on("click", ".delete", function(event)
{
	var target = $(event.target);
	var fullId = target.attr("id");
	var numId = fullId.substring(fullId.lastIndexOf("e") + 1);
	
	deleteBucket(bucketArray, bucketArray[numId]);
});