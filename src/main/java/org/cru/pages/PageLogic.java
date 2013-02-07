package org.cru.pages;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.cru.entities.Bucket;

@Path("/pages/main")
public class PageLogic
{
	private List<Bucket> bucketList;
	
	@Context
    private HttpServletRequest request;
	
	
	@POST
	@Path("bucket/{bucket}")
	public void addBucket(@PathParam("bucket") String bucket)
	{
		Bucket bucketObject = new Bucket();
		
		bucketObject.setHours(0.0);
		bucketObject.setName("");
		bucketList.add(bucketObject);
	}
	
	@POST
	@Path("hour/{bucket}")
	public void addHour(@PathParam("bucket") String bucket)
	{
//		bucket.setHours(bucket.getHours() + 1.0);
	}
	
	@POST
	@Path("halfhour/{bucket}")
	public void addHalfHour(@PathParam("bucket") String bucket)
	{
//		bucket.setHours(bucket.getHours() + 0.5);
	}
	
	@POST
	@Path("fifteenminutes/{bucket}")
	public void addFifteenMinutes(@PathParam("bucket") String bucket)
	{
//		bucket.setHours(bucket.getHours() + 0.25);
	}
	
	@GET
	@Path("bucketlist")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Bucket> getBucketList()
	{
		return bucketList;
	}
}