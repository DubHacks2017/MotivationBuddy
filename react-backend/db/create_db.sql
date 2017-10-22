DROP TABLE IF EXISTS GOALS;
DROP TABLE IF EXISTS BUDDY_POINTS;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS COMPLETED_GOALS;


CREATE TABLE USERS(
	email TEXT,
	name TEXT,
	fb_uid int,
	PRIMARY KEY(fb_uid)
);

CREATE TABLE BUDDY_POINTS(
	requester_fb_uid int,
	recipient_fb_uid int,
	point_balance int,
	FOREIGN KEY(requester_fb_uid) references USERS(fb_uid),
	FOREIGN KEY(recipient_fb_uid) references USERS(fb_uid)
);

CREATE TABLE GOALS(
	goal_id int,
	requester_fb_uid int,
	recipient_fb_uid int,
	goal_description TEXT,
	requester_marked_complete int,
	deadline DATE,
	points int,
	reward TEXT,
	FOREIGN KEY(requester_fb_uid) references USERS(fb_uid),
	FOREIGN KEY(recipient_fb_uid) references USERS(fb_uid),
	PRIMARY KEY(goal_id)
);

CREATE TABLE COMPLETED_GOALS(
	goal_id int,
	requester_fb_uid int,
	recipient_fb_uid int,
	goal_description TEXT,
	deadline DATE,
	finished DATE,
	points int,
	reward TEXT,
	FOREIGN KEY(requester_fb_uid) references USERS(fb_uid),
	FOREIGN KEY(recipient_fb_uid) references USERS(fb_uid),
	PRIMARY KEY(goal_id)
);
